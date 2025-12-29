# Twilio Phone Verification Setup Guide

## Step 1: Get Twilio Credentials

1. **Go to Twilio Console**: https://console.twilio.com
2. **Get your Account SID and Auth Token**:
   - Dashboard → Account Info
   - Copy your **Account SID** and **Auth Token**
   - ⚠️ Keep these SECRET - never put in client-side code!

## Step 2: Set Up Twilio Verify Service

1. **In Twilio Console sidebar**, click **"Verify"**
2. **Create a new Verify Service**:
   - Click "Create new Verify Service"
   - Give it a name (e.g., "AllNetworks Verification")
   - Click "Create"
3. **Copy the Service SID** - you'll need this for your backend

## Step 3: Set Up Backend Server

You have 3 options:

### Option A: Use Twilio Functions (Easiest - No Server Needed!)

1. Go to **Twilio Console → Functions**
2. Create a new function for each endpoint:
   - `/send-otp` - Sends verification code
   - `/verify-otp` - Verifies the code
3. Use the code from `twilio-backend-example.js`
4. Get the Function URL and update `TWILIO_BACKEND_URL` in your HTML

### Option B: Deploy Node.js Backend

1. Use the `twilio-backend-example.js` file
2. Install dependencies: `npm install express twilio cors`
3. Add your Twilio credentials
4. Deploy to:
   - **Heroku** (free tier available)
   - **AWS Lambda**
   - **Google Cloud Functions**
   - Any Node.js hosting
5. Update `TWILIO_BACKEND_URL` in your HTML file

### Option C: Use a Backend-as-a-Service

- **Firebase Functions**
- **Netlify Functions**
- **Vercel Serverless Functions**

## Step 4: Update Your HTML File

In `index (1).html`, find this line and update it:

```javascript
const TWILIO_BACKEND_URL = "https://your-backend.com/api/twilio";
```

Replace with your actual backend URL:
- Twilio Functions: `https://your-function.twilio.io`
- Your server: `https://your-domain.com/api/twilio`
- Heroku: `https://your-app.herokuapp.com/api/twilio`

## Step 5: Test

1. Open your HTML file
2. Fill in Step 3 (Your details)
3. Enter phone number
4. Click "Send Verification Code"
5. Enter the 6-digit code you receive
6. Click "Verify"

## Backend Endpoints Required

Your backend needs these two endpoints:

### POST `/api/twilio/send-otp`
**Request:**
```json
{
  "phoneNumber": "+972501234567"
}
```

**Response:**
```json
{
  "success": true,
  "verificationSid": "VE...",
  "message": "Verification code sent"
}
```

### POST `/api/twilio/verify-otp`
**Request:**
```json
{
  "phoneNumber": "+972501234567",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Phone number verified successfully"
}
```

## Security Notes

⚠️ **IMPORTANT:**
- NEVER put Twilio credentials in client-side code
- Always use a backend server to call Twilio APIs
- Use HTTPS for all API calls
- Validate phone numbers on the backend
- Rate limit your endpoints to prevent abuse

## Troubleshooting

- **"Failed to send OTP"**: Check your backend is running and credentials are correct
- **"Invalid verification code"**: Code expires after 10 minutes, request a new one
- **CORS errors**: Make sure your backend has CORS enabled
- **Phone not receiving SMS**: Check Twilio account has SMS enabled and sufficient balance

## Twilio Pricing

- Verify API: ~$0.05 per verification
- SMS: ~$0.0075 per SMS (varies by country)
- Free trial includes $15.50 credit

## Need Help?

- Twilio Docs: https://www.twilio.com/docs/verify
- Twilio Support: https://support.twilio.com

