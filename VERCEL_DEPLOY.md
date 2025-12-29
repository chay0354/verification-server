# Deploy to Vercel - Step by Step Guide

## Your Environment Variables

You need to add these in Vercel Dashboard:

```
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_VERIFY_SERVICE_SID=your_verify_service_sid_here
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SHEET_NAME=Sheet1
```

## Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to: https://vercel.com
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Import your repository or upload the folder
5. Vercel will auto-detect it's a Node.js project
6. Click **"Deploy"**

### Option B: Using Vercel CLI

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **sim-website** (or any name)
- Directory? **./** (current directory)
- Override settings? **No**

## Step 3: Add Environment Variables

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - `TWILIO_ACCOUNT_SID` = `your_account_sid_here`
   - `TWILIO_AUTH_TOKEN` = `your_auth_token_here`
   - `TWILIO_VERIFY_SERVICE_SID` = `your_verify_service_sid_here`
   - `GOOGLE_SHEET_ID` = `your_google_sheet_id_here`
   - `GOOGLE_SHEET_NAME` = `Sheet1`
4. Click **Save**
5. **Redeploy** your project (Settings → Deployments → Redeploy)

## Step 4: Update Your HTML File

In `index (1).html`, find:
```javascript
const TWILIO_BACKEND_URL = "https://your-backend.com/api/twilio";
```

Replace with your Vercel URL:
```javascript
const TWILIO_BACKEND_URL = "https://your-project.vercel.app/api";
```

Your API endpoints will be:
- `https://your-project.vercel.app/api/send-otp`
- `https://your-project.vercel.app/api/verify-otp`

## Step 5: Test

1. Open your HTML file
2. Go to Step 3 (Your details)
3. Enter phone number
4. Click "Send Verification Code"
5. Enter the code you receive
6. Click "Verify"

## File Structure

```
sim-website/
├── api/
│   ├── send-otp.js      # Send OTP endpoint
│   └── verify-otp.js    # Verify OTP endpoint
├── index (1).html       # Your main website
├── package.json         # Dependencies
├── vercel.json          # Vercel configuration
└── env.example.txt      # Environment variables template
```

## Troubleshooting

- **Function timeout**: Increase `maxDuration` in `vercel.json`
- **CORS errors**: Already configured in `vercel.json`
- **Environment variables not working**: Make sure you redeployed after adding them
- **404 on API routes**: Check that files are in `api/` folder

## Vercel Free Tier Limits

- 100GB bandwidth/month
- 100 serverless function invocations/day
- Perfect for testing and small projects!

