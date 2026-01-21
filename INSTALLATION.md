# R&M Groups - Installation Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/R-M-Groups.git
cd R-M-Groups
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Neon Database Package
```bash
npm install @neondatabase/serverless
```

### 4. Environment Setup
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id.googleusercontent.com
```

### 5. Google OAuth Setup
To enable Google authentication:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity Services)
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Configure the OAuth consent screen
6. Add your domains to authorized origins:
   
   **Authorized JavaScript Origins:**
   - For development: `http://localhost:3000` and `http://localhost:3001`
   - For production: `https://r-m-groups.vercel.app`
   
   **Authorized Redirect URIs:**
   - For development: `http://localhost:3000` and `http://localhost:3001`
   - For production: `https://r-m-groups.vercel.app`

7. Copy the Client ID and replace `your_actual_google_client_id.apps.googleusercontent.com` in your `.env.local` file

**Note:** It may take 5 minutes to a few hours for Google OAuth settings to take effect.

### 6. Database Setup

#### Option A: Automatic Setup
Run the database initialization script:
```bash
npm run init-db
```

#### Option B: Manual Setup
1. Uncomment the Neon import in `services/database.ts`:
```typescript
// Replace the mock implementation with:
import { neon } from '@neondatabase/serverless';
const sql = neon('postgresql://neondb_owner:npg_q3RDgixPA1Tm@ep-jolly-dust-ahnmv417-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
```

2. The database tables will be created automatically when the app starts.

### 7. Start Development Server
```bash
npm run dev
```

### 8. Build for Production
```bash
npm run build
npm run preview
```

## Database Schema

The application creates the following tables automatically:

### Users Table
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `phone` (VARCHAR, Optional)
- `date_of_birth` (DATE, Optional)
- `nationality` (VARCHAR, Optional)
- `passport_number` (VARCHAR, Optional)
- `preferred_services` (TEXT[])
- `loyalty_points` (INTEGER, Default: 0)
- `membership_tier` (VARCHAR, Default: 'Bronze')
- `is_verified` (BOOLEAN, Default: false)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `last_login_at` (TIMESTAMP, Optional)

### Bookings Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `service_type` (VARCHAR)
- `service_details` (JSONB)
- `status` (VARCHAR, Default: 'pending')
- `total_amount` (DECIMAL)
- `currency` (VARCHAR, Default: 'NGN')
- `payment_status` (VARCHAR, Default: 'pending')
- `booking_date` (TIMESTAMP)
- `travel_date` (TIMESTAMP, Optional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### User Sessions Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `token_hash` (VARCHAR)
- `expires_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `last_used_at` (TIMESTAMP)
- `ip_address` (INET, Optional)
- `user_agent` (TEXT, Optional)

### Travel Preferences Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `preferred_airlines` (TEXT[])
- `seat_preference` (VARCHAR)
- `meal_preference` (VARCHAR)
- `special_requirements` (TEXT)
- `notification_preferences` (JSONB)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Features

### Authentication System
- User registration and login
- Session management with caching (15-minute cache timeout)
- Password hashing and validation
- JWT token-based authentication
- Automatic session restoration

### Database Integration
- Neon PostgreSQL serverless database
- Connection pooling and optimization
- Automatic table creation and indexing
- Session caching for improved performance

### UI/UX Enhancements
- Glowing animations throughout the site
- Responsive design for all devices
- Professional styling with Tailwind CSS
- Interactive components with smooth transitions

### Travel Services
- Flight booking management
- Visa processing assistance
- Luxury car rentals
- Private jet charters
- Urban delivery services
- Travel preferences management

## Default Admin Account

After running the database initialization, you can use:
- **Email**: admin@rmgroups.ng
- **Password**: admin123

## Configuration

### Google Analytics Setup
1. Replace `G-RMGROUPS2026` with your GA4 tracking ID in:
   - `index.html`
   - `components/GoogleAnalytics.tsx`
2. Replace `GTM-RMGROUPS` with your GTM container ID in `index.html`

### PWA Configuration
Update `public/manifest.json` with your app details:
- App name and description
- Icons and screenshots
- Theme colors
- Start URL

## Troubleshooting

### PowerShell Execution Policy Error
If you encounter execution policy errors on Windows:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Database Connection Issues
1. Verify the Neon connection string is correct
2. Check if the database is accessible
3. Ensure the `@neondatabase/serverless` package is installed

### Build Issues
1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Check TypeScript errors:
```bash
npx tsc --noEmit
```

## Support

For support, contact:
- **Email**: mercurygroups247@gmail.com
- **Phone**: +234 901 190 2882
- **WhatsApp**: +234 901 190 2882

## License

This project is proprietary software owned by R&M Groups. All rights reserved.