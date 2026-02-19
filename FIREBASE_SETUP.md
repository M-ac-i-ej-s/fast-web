# Firebase Setup Guide

This project uses Firebase for authentication and Firestore for data storage. Follow these steps to set up Firebase for your project.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## 2. Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable the following providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and configure OAuth consent screen
   - **GitHub**: Click on it, toggle "Enable", and add your GitHub OAuth app credentials
     - Create OAuth app at: https://github.com/settings/developers
     - Set Authorization callback URL to: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`

## 3. Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Start in production mode**
4. Select a Cloud Firestore location (choose one close to your users)
5. Click **Enable**

### Configure Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Copy the contents of `firestore.rules` from your project root
3. Paste it into the rules editor
4. Click **Publish**

The security rules ensure that:

- Users can only read, create, update, and delete their own pages
- Page data structure is validated before creation
- Only authenticated users can access the pages collection

## 4. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon) → **General**
2. Scroll down to "Your apps" section
3. Click on the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "BuildAI Web")
5. Copy the `firebaseConfig` object

## 5. Configure Your App

1. Open `src/plugins/firebase.ts`
2. Replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

If you want to enable GitHub authentication:

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:3000` (development) or your production URL
   - **Authorization callback URL**: `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**
6. In Firebase Console → Authentication → Sign-in method → GitHub:
   - Paste the Client ID and Client Secret
   - Save

## 6. Google OAuth Setup (Optional)

Google sign-in should work automatically with Firebase, but you may need to:

1. Configure OAuth consent screen in [Google Cloud Console](https://console.cloud.google.com/)
2. Add authorized domains in Firebase Console → Authentication → Settings → Authorized domains

## Usage

The authentication system is now ready to use:

### Sign Up

- Navigate to `/signup`
- Users can sign up with email/password, Google, or GitHub

### Sign In

- Click "Let's Go!" button in header → "Login"
- Users can sign in with email/password, Google, or GitHub

### Using Auth in Components

```typescript
import { useAuth } from "@/composables/useAuth";

const { user, signIn, signUp, signOut } = useAuth();

// Check if user is logged in
if (user.value) {
  console.log("User:", user.value.displayName);
}
```

## Security Notes

- Never commit your Firebase config with real values to public repositories
- Consider using environment variables for production
- Firestore security rules are in `firestore.rules` - review and update as needed
- The current rules ensure users can only access their own pages

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"

- Check that your API key is correct in `firebase.ts`

### "Firebase: Error (auth/operation-not-allowed)"

- Make sure the authentication method is enabled in Firebase Console

### "Firebase: Error (auth/unauthorized-domain)"

- Add your domain to authorized domains in Firebase Console → Authentication → Settings

### Firestore permission errors

- Verify security rules are published in Firestore Database → Rules tab
- Check that the user is authenticated before accessing Firestore
- Ensure the user's UID matches the `userId` field in documents

## Next Steps

Consider adding:

- Password reset functionality
- Email verification
- User profile management
- Protected routes that require authentication
- Page configuration storage (form settings, SEO, analytics)
- Page content storage (generated HTML/CSS)
- Page versioning and history
- Collaborative features (sharing pages with other users)
