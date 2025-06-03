# ইসলামী সমাজকল্যাণ পরিষদ - Website

A modern, responsive website for the Islamic Social Welfare Organization with comprehensive Firebase integration for financial management.

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

### `expenses` (NEW)
\`\`\`
{
  category: string,
  subcategory: string,
  amount: number,
  description: string,
  approvedBy: string,
  receiptNumber: string,
  submittedAt: Timestamp,
  status: 'pending' | 'approved' | 'rejected',
  paymentMethod: string,
  vendor: string
}
\`\`\`

### `budgets` (NEW)
\`\`\`
{
  category: string,
  allocatedAmount: number,
  spentAmount: number,
  remainingAmount: number,
  fiscalYear: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
\`\`\`

### `financialReports` (NEW)
\`\`\`
{
  reportType: 'monthly' | 'quarterly' | 'yearly',
  period: string,
  totalIncome: number,
  totalExpense: number,
  netBalance: number,
  generatedAt: Timestamp,
  generatedBy: string
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
    
    // Financial management - Admin only
    match /expenses/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /budgets/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /financialReports/{document} {
      allow read, write: if request.auth != null;
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
- ✅ **Financial Management System**
- ✅ **Expense Tracking**
- ✅ **Budget Management**
- ✅ **Financial Reports**
- ✅ **Real-time Financial Dashboard**
- ✅ Responsive design
- ✅ Islamic design aesthetics

## Financial Management Features

### 💰 **Expense Management**
- Add new expenses with categories
- Track payment methods and vendors
- Receipt number management
- Approval workflow

### 📊 **Budget Planning**
- Create budgets by category
- Track allocated vs spent amounts
- Visual progress indicators
- Fiscal year management

### 📈 **Financial Reports**
- Monthly, quarterly, yearly reports
- Income vs expense analysis
- Net balance calculations
- Export functionality

### 🔄 **Real-time Updates**
- Live financial data from Firebase
- Automatic calculations
- Instant dashboard updates
- Transaction history

## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables

Make sure to set up your `.env.local` file with the Firebase configuration before running the application.

## Usage

1. **Public Forms**: Anyone can submit donations, admissions, and campaign joins
2. **Admin Panel**: Requires authentication to access financial management
3. **Financial Management**: 
   - Add expenses and track spending
   - Create and manage budgets
   - Generate financial reports
   - Export data for accounting

## Demo Credentials

For testing purposes:
- **Email**: admin@islamicwelfare.org
- **Password**: password123

All financial data is stored in Firebase Firestore and can be viewed in real-time through the Firebase Console.
