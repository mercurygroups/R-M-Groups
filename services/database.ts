// Database service for R&M Groups using Neon PostgreSQL
import { trackEvent } from '../components/GoogleAnalytics';

// Database configuration
const DATABASE_URL = process.env.DATABASE_URL;
const NEON_API_URL = process.env.NEON_API_URL;

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  passportNumber?: string;
  preferredServices: string[];
  loyaltyPoints: number;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

// Booking interface
export interface Booking {
  id: string;
  userId: string;
  serviceType: string;
  serviceDetails: any;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  bookingDate: string;
  travelDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication response interface
export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message: string;
}

// Database service class
class DatabaseService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = NEON_API_URL || '';
  }

  // Execute SQL query via Neon REST API
  private async executeQuery(sql: string, params: any[] = []): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getApiKey()}`
        },
        body: JSON.stringify({
          query: sql,
          params: params
        })
      });

      if (!response.ok) {
        throw new Error(`Database query failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  private getApiKey(): string {
    // In a real implementation, this would be securely managed
    return 'your-neon-api-key';
  }

  // Initialize database tables
  async initializeTables(): Promise<void> {
    try {
      // Users table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          phone VARCHAR(20),
          date_of_birth DATE,
          nationality VARCHAR(100),
          passport_number VARCHAR(50),
          preferred_services TEXT[],
          loyalty_points INTEGER DEFAULT 0,
          membership_tier VARCHAR(20) DEFAULT 'Bronze',
          is_verified BOOLEAN DEFAULT FALSE,
          verification_token VARCHAR(255),
          reset_token VARCHAR(255),
          reset_token_expires TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login_at TIMESTAMP
        )
      `);

      // Bookings table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS bookings (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          service_type VARCHAR(100) NOT NULL,
          service_details JSONB NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          total_amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'NGN',
          payment_status VARCHAR(20) DEFAULT 'pending',
          booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          travel_date TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // User sessions table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS user_sessions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          token_hash VARCHAR(255) NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          ip_address INET,
          user_agent TEXT
        )
      `);

      // Travel preferences table
      await this.executeQuery(`
        CREATE TABLE IF NOT EXISTS travel_preferences (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          preferred_airlines TEXT[],
          seat_preference VARCHAR(20),
          meal_preference VARCHAR(50),
          special_requirements TEXT,
          notification_preferences JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database tables:', error);
      throw error;
    }
  }

  // User registration
  async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthResponse> {
    try {
      // Hash password (in a real app, this would be done server-side)
      const passwordHash = await this.hashPassword(userData.password);

      const result = await this.executeQuery(`
        INSERT INTO users (email, password_hash, first_name, last_name, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, first_name, last_name, phone, loyalty_points, membership_tier, is_verified, created_at
      `, [userData.email, passwordHash, userData.firstName, userData.lastName, userData.phone || null]);

      if (result.rows && result.rows.length > 0) {
        const user = this.mapUserFromDb(result.rows[0]);
        const token = await this.generateJWT(user.id);

        // Track registration
        if (window.gtag) {
          trackEvent('user_registration', 'Authentication', 'New User Signup');
        }

        return {
          success: true,
          user,
          token,
          message: 'Registration successful'
        };
      }

      return {
        success: false,
        message: 'Registration failed'
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message.includes('duplicate key')) {
        return {
          success: false,
          message: 'Email already exists'
        };
      }

      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  }

  // User login
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const result = await this.executeQuery(`
        SELECT id, email, password_hash, first_name, last_name, phone, 
               loyalty_points, membership_tier, is_verified, created_at
        FROM users 
        WHERE email = $1
      `, [email]);

      if (!result.rows || result.rows.length === 0) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      const userRow = result.rows[0];
      const isValidPassword = await this.verifyPassword(password, userRow.password_hash);

      if (!isValidPassword) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Update last login
      await this.executeQuery(`
        UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1
      `, [userRow.id]);

      const user = this.mapUserFromDb(userRow);
      const token = await this.generateJWT(user.id);

      // Track login
      if (window.gtag) {
        trackEvent('user_login', 'Authentication', 'User Login');
      }

      return {
        success: true,
        user,
        token,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  }

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const result = await this.executeQuery(`
        SELECT id, email, first_name, last_name, phone, date_of_birth, 
               nationality, passport_number, preferred_services, loyalty_points, 
               membership_tier, is_verified, created_at, updated_at, last_login_at
        FROM users 
        WHERE id = $1
      `, [userId]);

      if (result.rows && result.rows.length > 0) {
        return this.mapUserFromDb(result.rows[0]);
      }

      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<boolean> {
    try {
      const setClause = [];
      const values = [];
      let paramIndex = 1;

      if (updates.firstName) {
        setClause.push(`first_name = $${paramIndex++}`);
        values.push(updates.firstName);
      }
      if (updates.lastName) {
        setClause.push(`last_name = $${paramIndex++}`);
        values.push(updates.lastName);
      }
      if (updates.phone) {
        setClause.push(`phone = $${paramIndex++}`);
        values.push(updates.phone);
      }
      if (updates.dateOfBirth) {
        setClause.push(`date_of_birth = $${paramIndex++}`);
        values.push(updates.dateOfBirth);
      }
      if (updates.nationality) {
        setClause.push(`nationality = $${paramIndex++}`);
        values.push(updates.nationality);
      }
      if (updates.passportNumber) {
        setClause.push(`passport_number = $${paramIndex++}`);
        values.push(updates.passportNumber);
      }
      if (updates.preferredServices) {
        setClause.push(`preferred_services = $${paramIndex++}`);
        values.push(updates.preferredServices);
      }

      setClause.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(userId);

      await this.executeQuery(`
        UPDATE users 
        SET ${setClause.join(', ')}
        WHERE id = $${paramIndex}
      `, values);

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  }

  // Create booking
  async createBooking(bookingData: {
    userId: string;
    serviceType: string;
    serviceDetails: any;
    totalAmount: number;
    currency?: string;
    travelDate?: string;
  }): Promise<string | null> {
    try {
      const result = await this.executeQuery(`
        INSERT INTO bookings (user_id, service_type, service_details, total_amount, currency, travel_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `, [
        bookingData.userId,
        bookingData.serviceType,
        JSON.stringify(bookingData.serviceDetails),
        bookingData.totalAmount,
        bookingData.currency || 'NGN',
        bookingData.travelDate || null
      ]);

      if (result.rows && result.rows.length > 0) {
        // Track booking creation
        if (window.gtag) {
          trackEvent('booking_created', 'Bookings', bookingData.serviceType, bookingData.totalAmount);
        }

        return result.rows[0].id;
      }

      return null;
    } catch (error) {
      console.error('Create booking error:', error);
      return null;
    }
  }

  // Get user bookings
  async getUserBookings(userId: string): Promise<Booking[]> {
    try {
      const result = await this.executeQuery(`
        SELECT id, user_id, service_type, service_details, status, total_amount, 
               currency, payment_status, booking_date, travel_date, created_at, updated_at
        FROM bookings 
        WHERE user_id = $1 
        ORDER BY created_at DESC
      `, [userId]);

      if (result.rows) {
        return result.rows.map(this.mapBookingFromDb);
      }

      return [];
    } catch (error) {
      console.error('Get bookings error:', error);
      return [];
    }
  }

  // Helper methods
  private async hashPassword(password: string): Promise<string> {
    // In a real implementation, use bcrypt or similar
    // For demo purposes, using a simple hash
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'rm_groups_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password);
    return passwordHash === hash;
  }

  private async generateJWT(userId: string): Promise<string> {
    // In a real implementation, use a proper JWT library
    // For demo purposes, creating a simple token
    const payload = {
      userId,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    return btoa(JSON.stringify(payload));
  }

  private mapUserFromDb(row: any): User {
    return {
      id: row.id,
      email: row.email,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      dateOfBirth: row.date_of_birth,
      nationality: row.nationality,
      passportNumber: row.passport_number,
      preferredServices: row.preferred_services || [],
      loyaltyPoints: row.loyalty_points || 0,
      membershipTier: row.membership_tier || 'Bronze',
      isVerified: row.is_verified || false,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastLoginAt: row.last_login_at
    };
  }

  private mapBookingFromDb(row: any): Booking {
    return {
      id: row.id,
      userId: row.user_id,
      serviceType: row.service_type,
      serviceDetails: JSON.parse(row.service_details),
      status: row.status,
      totalAmount: parseFloat(row.total_amount),
      currency: row.currency,
      paymentStatus: row.payment_status,
      bookingDate: row.booking_date,
      travelDate: row.travel_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();

// Initialize database on module load
databaseService.initializeTables().catch(console.error);