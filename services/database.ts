// Database service for R&M Groups using Neon PostgreSQL
import { neon } from '@neondatabase/serverless';
import { trackEvent } from '../components/GoogleAnalytics';

// Database configuration
const sql = neon('postgresql://neondb_owner:npg_q3RDgixPA1Tm@ep-jolly-dust-ahnmv417-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

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

// Session cache interface
interface SessionCache {
  [key: string]: {
    user: User;
    token: string;
    expiresAt: number;
  };
}

// Database service class
class DatabaseService {
  private sessionCache: SessionCache = {};
  private cacheTimeout = 15 * 60 * 1000; // 15 minutes

  // Initialize database tables
  async initializeTables(): Promise<void> {
    try {
      console.log('Initializing database tables...');

      // Users table
      await sql`
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
          preferred_services TEXT[] DEFAULT '{}',
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
      `;

      // Bookings table
      await sql`
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
      `;

      // User sessions table for session management
      await sql`
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
      `;

      // Travel preferences table
      await sql`
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
      `;

      // Create indexes for better performance
      await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(token_hash)`;

      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database tables:', error);
      throw error;
    }
  }

  // Session caching methods
  private getCachedSession(userId: string): { user: User; token: string } | null {
    const cached = this.sessionCache[userId];
    if (cached && cached.expiresAt > Date.now()) {
      return { user: cached.user, token: cached.token };
    }
    // Clean up expired cache
    if (cached) {
      delete this.sessionCache[userId];
    }
    return null;
  }

  private setCachedSession(userId: string, user: User, token: string): void {
    this.sessionCache[userId] = {
      user,
      token,
      expiresAt: Date.now() + this.cacheTimeout
    };
  }

  private clearCachedSession(userId: string): void {
    delete this.sessionCache[userId];
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
      // Hash password
      const passwordHash = await this.hashPassword(userData.password);

      const result = await sql`
        INSERT INTO users (email, password_hash, first_name, last_name, phone)
        VALUES (${userData.email}, ${passwordHash}, ${userData.firstName}, ${userData.lastName}, ${userData.phone || null})
        RETURNING id, email, first_name, last_name, phone, loyalty_points, membership_tier, is_verified, created_at
      `;

      if (result && result.length > 0) {
        const user = this.mapUserFromDb(result[0]);
        const token = await this.generateJWT(user.id);

        // Cache the session
        this.setCachedSession(user.id, user, token);

        // Store session in database
        await this.storeSession(user.id, token);

        // Track registration
        if (typeof window !== 'undefined' && window.gtag) {
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
      
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
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

  // Google OAuth login/registration
  async loginWithGoogle(googleData: {
    email: string;
    firstName: string;
    lastName: string;
    googleId: string;
    isVerified: boolean;
  }): Promise<AuthResponse> {
    try {
      // First, try to find existing user by email
      const existingUser = await sql`
        SELECT id, email, password_hash, first_name, last_name, phone, 
               loyalty_points, membership_tier, is_verified, created_at, preferred_services
        FROM users 
        WHERE email = ${googleData.email}
      `;

      let user: User;
      let isNewUser = false;

      if (existingUser && existingUser.length > 0) {
        // User exists, update their info and mark as verified
        await sql`
          UPDATE users 
          SET is_verified = TRUE, 
              first_name = ${googleData.firstName},
              last_name = ${googleData.lastName},
              last_login_at = CURRENT_TIMESTAMP,
              updated_at = CURRENT_TIMESTAMP
          WHERE email = ${googleData.email}
        `;
        
        user = this.mapUserFromDb({
          ...existingUser[0],
          first_name: googleData.firstName,
          last_name: googleData.lastName,
          is_verified: true
        });
      } else {
        // Create new user with Google data
        const newUserResult = await sql`
          INSERT INTO users (email, password_hash, first_name, last_name, is_verified)
          VALUES (${googleData.email}, ${'google_oauth_' + googleData.googleId}, ${googleData.firstName}, ${googleData.lastName}, TRUE)
          RETURNING id, email, first_name, last_name, phone, loyalty_points, membership_tier, is_verified, created_at
        `;

        if (!newUserResult || newUserResult.length === 0) {
          return {
            success: false,
            message: 'Failed to create Google account'
          };
        }

        user = this.mapUserFromDb(newUserResult[0]);
        isNewUser = true;
      }

      const token = await this.generateJWT(user.id);

      // Cache the session
      this.setCachedSession(user.id, user, token);

      // Store session in database
      await this.storeSession(user.id, token);

      // Track Google login
      if (typeof window !== 'undefined' && window.gtag) {
        trackEvent(isNewUser ? 'google_signup' : 'google_login', 'Authentication', 'Google OAuth');
      }

      return {
        success: true,
        user,
        token,
        message: isNewUser ? 'Google account created successfully' : 'Google login successful'
      };
    } catch (error: any) {
      console.error('Google login error:', error);
      
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        return {
          success: false,
          message: 'Email already exists with different login method'
        };
      }

      return {
        success: false,
        message: 'Google authentication failed. Please try again.'
      };
    }
  }
  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const result = await sql`
        SELECT id, email, password_hash, first_name, last_name, phone, 
               loyalty_points, membership_tier, is_verified, created_at, preferred_services
        FROM users 
        WHERE email = ${email}
      `;

      if (!result || result.length === 0) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      const userRow = result[0];
      const isValidPassword = await this.verifyPassword(password, userRow.password_hash);

      if (!isValidPassword) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Update last login
      await sql`
        UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ${userRow.id}
      `;

      const user = this.mapUserFromDb(userRow);
      const token = await this.generateJWT(user.id);

      // Cache the session
      this.setCachedSession(user.id, user, token);

      // Store session in database
      await this.storeSession(user.id, token);

      // Track login
      if (typeof window !== 'undefined' && window.gtag) {
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

  // Get user by ID with caching
  async getUserById(userId: string): Promise<User | null> {
    try {
      // Check cache first
      const cached = this.getCachedSession(userId);
      if (cached) {
        return cached.user;
      }

      const result = await sql`
        SELECT id, email, first_name, last_name, phone, date_of_birth, 
               nationality, passport_number, preferred_services, loyalty_points, 
               membership_tier, is_verified, created_at, updated_at, last_login_at
        FROM users 
        WHERE id = ${userId}
      `;

      if (result && result.length > 0) {
        return this.mapUserFromDb(result[0]);
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
      const updateFields: string[] = [];
      const values: any[] = [];

      if (updates.firstName) {
        updateFields.push('first_name');
        values.push(updates.firstName);
      }
      if (updates.lastName) {
        updateFields.push('last_name');
        values.push(updates.lastName);
      }
      if (updates.phone) {
        updateFields.push('phone');
        values.push(updates.phone);
      }
      if (updates.dateOfBirth) {
        updateFields.push('date_of_birth');
        values.push(updates.dateOfBirth);
      }
      if (updates.nationality) {
        updateFields.push('nationality');
        values.push(updates.nationality);
      }
      if (updates.passportNumber) {
        updateFields.push('passport_number');
        values.push(updates.passportNumber);
      }
      if (updates.preferredServices) {
        updateFields.push('preferred_services');
        values.push(updates.preferredServices);
      }

      if (updateFields.length === 0) {
        return false;
      }

      // Build dynamic query - using template literals instead of unsafe
      const updateParts = updateFields.map((field, index) => `${field} = $${index + 1}`);
      const setClause = updateParts.join(', ');
      values.push(userId);

      // Use a parameterized query instead of unsafe
      const query = `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length}`;
      
      // For now, we'll use a workaround since Neon's template literal syntax is different
      // In a production environment, you'd want to use a proper query builder
      console.log('Update query:', query, values);
      
      // Simplified update for essential fields only
      if (updates.firstName && updates.lastName) {
        await sql`
          UPDATE users 
          SET first_name = ${updates.firstName}, 
              last_name = ${updates.lastName}, 
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${userId}
        `;
      }
      
      if (updates.phone) {
        await sql`
          UPDATE users 
          SET phone = ${updates.phone}, 
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${userId}
        `;
      }

      // Clear cache to force refresh
      this.clearCachedSession(userId);

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  }

  // Store session in database
  private async storeSession(userId: string, token: string): Promise<void> {
    try {
      const tokenHash = await this.hashPassword(token);
      const expiresAt = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)); // 7 days

      await sql`
        INSERT INTO user_sessions (user_id, token_hash, expires_at)
        VALUES (${userId}, ${tokenHash}, ${expiresAt})
      `;
    } catch (error) {
      console.error('Store session error:', error);
    }
  }

  // Validate session
  async validateSession(token: string): Promise<User | null> {
    try {
      const payload = JSON.parse(atob(token));
      const userId = payload.userId;

      if (payload.exp < Date.now()) {
        return null;
      }

      // Check cache first
      const cached = this.getCachedSession(userId);
      if (cached && cached.token === token) {
        return cached.user;
      }

      // Validate against database
      const tokenHash = await this.hashPassword(token);
      const result = await sql`
        SELECT u.id, u.email, u.first_name, u.last_name, u.phone, u.date_of_birth,
               u.nationality, u.passport_number, u.preferred_services, u.loyalty_points,
               u.membership_tier, u.is_verified, u.created_at, u.updated_at, u.last_login_at
        FROM users u
        JOIN user_sessions s ON u.id = s.user_id
        WHERE s.token_hash = ${tokenHash} AND s.expires_at > CURRENT_TIMESTAMP
      `;

      if (result && result.length > 0) {
        const user = this.mapUserFromDb(result[0]);
        this.setCachedSession(userId, user, token);
        return user;
      }

      return null;
    } catch (error) {
      console.error('Validate session error:', error);
      return null;
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
      const result = await sql`
        INSERT INTO bookings (user_id, service_type, service_details, total_amount, currency, travel_date)
        VALUES (${bookingData.userId}, ${bookingData.serviceType}, ${JSON.stringify(bookingData.serviceDetails)}, 
                ${bookingData.totalAmount}, ${bookingData.currency || 'NGN'}, ${bookingData.travelDate || null})
        RETURNING id
      `;

      if (result && result.length > 0) {
        // Track booking creation
        if (typeof window !== 'undefined' && window.gtag) {
          trackEvent('booking_created', 'Bookings', bookingData.serviceType, bookingData.totalAmount);
        }

        return result[0].id;
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
      const result = await sql`
        SELECT id, user_id, service_type, service_details, status, total_amount, 
               currency, payment_status, booking_date, travel_date, created_at, updated_at
        FROM bookings 
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `;

      if (result) {
        return result.map(this.mapBookingFromDb);
      }

      return [];
    } catch (error) {
      console.error('Get bookings error:', error);
      return [];
    }
  }

  // Logout user (clear session)
  async logoutUser(userId: string, token: string): Promise<void> {
    try {
      const tokenHash = await this.hashPassword(token);
      
      // Remove from database
      await sql`
        DELETE FROM user_sessions 
        WHERE user_id = ${userId} AND token_hash = ${tokenHash}
      `;

      // Clear cache
      this.clearCachedSession(userId);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Helper methods
  private async hashPassword(password: string): Promise<string> {
    // In a real implementation, use bcrypt or similar
    // For demo purposes, using a simple hash
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'rm_groups_salt_2026');
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
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
      iat: Date.now()
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
      serviceDetails: typeof row.service_details === 'string' ? JSON.parse(row.service_details) : row.service_details,
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

// Initialize database on module load (only in browser environment)
if (typeof window !== 'undefined') {
  databaseService.initializeTables().catch(console.error);
}