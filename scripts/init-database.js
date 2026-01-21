// Database initialization script for R&M Groups
// Run this script to create the database tables

import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_q3RDgixPA1Tm@ep-jolly-dust-ahnmv417-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing R&M Groups database...');

    // Users table
    console.log('📝 Creating users table...');
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
    console.log('📝 Creating bookings table...');
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

    // User sessions table
    console.log('📝 Creating user_sessions table...');
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
    console.log('📝 Creating travel_preferences table...');
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

    // Create indexes
    console.log('📝 Creating database indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(token_hash)`;

    // Insert sample data (optional)
    console.log('📝 Checking for existing data...');
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    
    if (userCount[0].count === '0') {
      console.log('📝 Inserting sample admin user...');
      
      // Create a simple hash for demo password
      const encoder = new TextEncoder();
      const data = encoder.encode('admin123' + 'rm_groups_salt_2026');
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      await sql`
        INSERT INTO users (email, password_hash, first_name, last_name, phone, membership_tier, loyalty_points, is_verified)
        VALUES ('admin@rmgroups.ng', ${passwordHash}, 'Admin', 'User', '+234 901 190 2882', 'Platinum', 10000, true)
      `;
      
      console.log('✅ Sample admin user created:');
      console.log('   Email: admin@rmgroups.ng');
      console.log('   Password: admin123');
    }

    console.log('✅ Database initialization completed successfully!');
    console.log('🎉 R&M Groups database is ready for use.');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();