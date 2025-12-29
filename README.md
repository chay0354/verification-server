# AllNetworks SIM/eSIM Ordering Website

A complete SIM and eSIM ordering system with phone verification, coupon codes, and payment integration.

## Features

- ✅ Multi-step order form (Plan → SIM Type → Details → Payment)
- ✅ Phone number verification via Twilio
- ✅ Coupon code system (fetches from Google Sheets)
- ✅ Price calculation with shipping fees
- ✅ WhatsApp/LINE integration
- ✅ Responsive design

## Quick Start

### 1. Environment Variables

Copy `env.example.txt` and create `.env.local` with your credentials:

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_VERIFY_SERVICE_SID=your_verify_service_sid
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SHEET_NAME=Sheet1
```

### 2. Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel Dashboard
4. Update `TWILIO_BACKEND_URL` in `index (1).html` with your Vercel URL

See `VERCEL_DEPLOY.md` for detailed instructions.

### 3. Update HTML File

In `index (1).html`, update:
- `TWILIO_BACKEND_URL` - Your Vercel project URL
- `GOOGLE_SHEET_ID` - Your Google Sheet ID (already configured)
- Payment links (Stripe/PayPal) if needed

## Project Structure

```
sim-website/
├── api/                    # Vercel serverless functions
│   ├── send-otp.js        # Send verification code
│   └── verify-otp.js      # Verify code
├── index (1).html         # Main website
├── package.json           # Dependencies
├── vercel.json           # Vercel config
└── env.example.txt        # Environment variables template
```

## API Endpoints

After deploying to Vercel:

- `POST /api/send-otp` - Send verification code
- `POST /api/verify-otp` - Verify code

## Setup Guides

- `VERCEL_DEPLOY.md` - Deploy to Vercel
- `TWILIO_SETUP_GUIDE.md` - Twilio configuration
- `QUICK_START.md` - Quick setup guide

## License

ISC

