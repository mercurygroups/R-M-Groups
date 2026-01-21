# Google OAuth Debug Guide

## Current Issue: Google Auth Not Working

### Quick Fix Steps:

#### 1. Update Google Cloud Console
Your server is running on **http://localhost:3001** (not 3000)

Go to [Google Cloud Console](https://console.cloud.google.com/) and add these origins:

**Authorized JavaScript Origins:**
```
http://localhost:3000
http://localhost:3001
https://r-m-groups.vercel.app
```

**Authorized Redirect URIs:**
```
http://localhost:3000
http://localhost:3001
https://r-m-groups.vercel.app
```

#### 2. Test the Debug Version
I've added extensive debugging to the Google Auth button. Open your browser console and:

1. Go to http://localhost:3001/login
2. Open Developer Tools (F12)
3. Click "Sign in with Google"
4. Check the Console tab for debug messages

#### 3. Common Issues & Solutions

**Issue: "Google authentication is not ready"**
- Solution: Wait 5-10 seconds after page load, then try again
- The Google script needs time to load

**Issue: "Failed to load Google authentication"**
- Solution: Check internet connection
- Verify the Google script is loading from https://accounts.google.com/gsi/client

**Issue: "No credential received from Google"**
- Solution: Check if popup was blocked
- Try allowing popups for localhost

**Issue: Client ID problems**
- Your current Client ID: `732704624254-vkphn66v68maaccm4h4s1ia5av1f1l2l.apps.googleusercontent.com`
- Verify this matches your Google Cloud Console

#### 4. Test Regular Login First
Before testing Google OAuth, verify regular email login works:

1. Go to http://localhost:3001/signup
2. Create a test account
3. Go to http://localhost:3001/login
4. Login with email/password
5. If this works, the database and auth system are fine

#### 5. Browser Console Debug Info
The enhanced GoogleAuthButton now shows:
- Client ID status
- Google script loading status
- Initialization success/failure
- Detailed error messages

#### 6. Alternative Testing Method
If the button doesn't work, try this manual test:

1. Open browser console on login page
2. Type: `window.google`
3. If it shows an object, Google loaded successfully
4. If undefined, Google script failed to load

#### 7. Network Issues
Check if these URLs are accessible:
- https://accounts.google.com/gsi/client
- https://accounts.google.com/

#### 8. Temporary Workaround
If Google OAuth still doesn't work, you can:
1. Use email/password registration for now
2. Test all other features
3. Fix Google OAuth later

## Expected Console Output (Working)
```
Google Client ID: 732704624254-vkphn66v68maaccm4h4s1ia5av1f1l2l.apps.googleusercontent.com
Loading Google Identity Services...
Google script loaded successfully
Initializing Google OAuth...
Google OAuth initialized successfully
```

## Expected Console Output (Error)
```
Google Client ID: 732704624254-vkphn66v68maaccm4h4s1ia5av1f1l2l.apps.googleusercontent.com
Loading Google Identity Services...
Failed to load Google Identity Services: [error details]
```

## Next Steps After Fixing
1. Test Google login on signup page
2. Test Google login on login page
3. Verify user data is saved to database
4. Test logout and re-login
5. Deploy to Vercel and test production

## Contact for Help
If you're still having issues, share:
1. Browser console output
2. Which step failed
3. Any error messages you see