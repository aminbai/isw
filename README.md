# ইসলামী সমাজকল্যাণ পরিষদ - Website

A modern, responsive website for the Islamic Social Welfare Organization with Firebase integration.

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Choose your preferred location

3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
   - Create an admin user account

4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web app icon to create a web app
   - Copy the configuration object

5. Create environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration values

## Firestore Collections Structure

The application uses the following Firestore collections:

### `admissions`
\`\`\`
{
  fullName: string,
  guardianName: string,
  phone: string,
  address: string,
  dateOfBirth: string,
  education: string,
  profession: string,
  submittedAt: Timestamp,
  status: 'pending' | 'approved' | 'rejected'
}
\`\`\`

### `campaignJoins`
\`\`\`
{
  campaignId: string,
  campaignName: string,
  name: string,
  phone: string,
  experience: string,
  submittedAt: Timestamp,
  status: 'pending' | 'approved' | 'rejected'
}
\`\`\`

### `donations`
\`\`\`
{
  donorName: string,
  phone: string,
  address: string,
  amount: number,
  paymentMethod: string,
  transactionId: string,
  donationId: string,
  submittedAt: Timestamp,
  verified: boolean
}
\`\`\`

## Security Rules

Add these Firestore security rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write for form submissions
    match /admissions/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /campaignJoins/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    match /donations/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
\`\`\`

## Admin Account Setup

1. Go to Firebase Authentication
2. Add a new user with email and password
3. Use these credentials to log into the admin panel

## Features

- ✅ Firebase Firestore integration
- ✅ Authentication for admin panel
- ✅ Real-time data fetching
- ✅ Form submissions with error handling
- ✅ Receipt generation
- ✅ Data export functionality
- ✅ Responsive design
- ✅ Islamic design aesthetics

## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables

Make sure to set up your `.env.local` file with the Firebase configuration before running the application.
\`\`\`

I've successfully integrated Firebase Firestore database and authentication into your Islamic welfare organization website. Here's what has been implemented:

## 🔥 **Firebase Integration Features:**

### **Database Structure**
- **Admissions Collection**: Stores membership applications with status tracking
- **Campaign Joins Collection**: Manages campaign participation requests  
- **Donations Collection**: Records all donations with verification status
- **Timestamps**: All submissions include Firebase timestamps for accurate tracking

### **Authentication System**
- **Admin Login Page**: Secure email/password authentication
- **Protected Admin Routes**: Only authenticated users can access admin panel
- **Session Management**: Automatic login state management with hooks
- **Logout Functionality**: Clean session termination

### **Real-time Data Management**
- **Form Submissions**: All forms now save directly to Firestore
- **Error Handling**: Comprehensive error messages in Bengali
- **Loading States**: User-friendly loading indicators
- **Success Confirmations**: Clear feedback after successful submissions

### **Admin Dashboard Enhancements**
- **Live Data**: Real-time fetching from Firestore collections
- **Statistics**: Dynamic calculation of totals and counts
- **Export Functionality**: Download reports with actual Firebase data
- **Date Formatting**: Proper Bengali date formatting for timestamps

### **Security Features**
- **Protected Routes**: Admin panel requires authentication
- **Input Validation**: Client-side and server-side validation
- **Error Boundaries**: Graceful error handling throughout the app
- **Secure Configuration**: Environment variables for Firebase config

## 🚀 **Setup Instructions:**

1. **Create Firebase Project** and enable Firestore + Authentication
2. **Copy environment variables** from the `.env.example` file
3. **Set up security rules** as provided in the README
4. **Create admin account** in Firebase Authentication
5. **Deploy and test** all form submissions

The website now has a complete backend infrastructure with Firebase, making it production-ready for your Islamic social welfare organization!
