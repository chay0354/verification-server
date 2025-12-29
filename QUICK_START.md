# Quick Start - Twilio Phone Verification

## Your Twilio Credentials

⚠️ **Account SID**: Get from Twilio Console Dashboard  
⚠️ **Verify Service SID**: Get from Twilio Console → Verify → Services  
⚠️ **Auth Token**: Get from Twilio Console → Account → Auth Token

## Step 1: Get Your Auth Token

1. Go to: https://console.twilio.com
2. Click on your account name (top right)
3. Go to **"Account"** → **"Auth Token"**
4. Click **"Show"** to reveal your Auth Token
5. Copy it

## Step 2: Update Backend File

Open `twilio-backend-example.js` and replace:
```javascript
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN_HERE';
```
With your actual Auth Token:
```javascript
const AUTH_TOKEN = 'your_actual_auth_token_here';
```

## Step 3: Install Dependencies

Open terminal in this folder and run:
```bash
npm install
```

## Step 4: Run the Server

```bash
npm start
```

You should see:
```
Twilio backend server running on port 3000
```

## Step 5: Update HTML File

In `index (1).html`, find this line:
```javascript
const TWILIO_BACKEND_URL = "https://your-backend.com/api/twilio";
```

Replace with your server URL:
- **Local testing**: `http://localhost:3000/api/twilio`
- **Deployed server**: `https://your-domain.com/api/twilio`

## Step 6: Test

1. Open `index (1).html` in your browser
2. Fill out the form to Step 3
3. Enter your phone number
4. Click "Send Verification Code"
5. Enter the code you receive
6. Click "Verify"

## Deploy to Production

### Option A: Heroku (Free Tier Available)

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Run:
```bash
heroku create your-app-name
git init
git add .
git commit -m "Initial commit"
git push heroku main
```
3. Set environment variables:
```bash
heroku config:set ACCOUNT_SID=your_account_sid_here
heroku config:set AUTH_TOKEN=your_auth_token_here
heroku config:set VERIFY_SERVICE_SID=your_verify_service_sid_here
```
4. Get your Heroku URL and update HTML file

### Option B: Twilio Functions (Easiest!)

1. Go to Twilio Console → Functions & Assets
2. Create a new function for `/send-otp`
3. Create another function for `/verify-otp`
4. Copy code from `twilio-backend-example.js`
5. Deploy and get the function URL

## Troubleshooting

- **"Failed to send OTP"**: Check Auth Token is correct
- **"Phone number unverified"**: Upgrade Twilio account or verify the number
- **CORS errors**: Make sure `cors` is installed and enabled
- **Port already in use**: Change PORT in the code or kill the process using port 3000

## Next Steps

Once it's working locally, deploy it so your website can use it!

