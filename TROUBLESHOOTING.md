# Troubleshooting 404 Errors on Vercel

## How to Check Vercel Logs

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `verification-server`
3. **Click on "Deployments"** tab
4. **Click on the latest deployment**
5. **Click on "Functions"** tab (or "Runtime Logs")
6. **Look for errors** - you'll see:
   - Function build errors
   - Runtime errors
   - 404 errors with details

## Common Issues and Solutions

### Issue 1: Functions Not Detected

**Symptoms**: 404 on all `/api/*` routes

**Solution**: 
- Make sure files are in `api/` folder (not `src/api/` or other)
- Files must be `.js` (not `.ts` unless configured)
- Functions must export a default function: `module.exports = async (req, res) => {}`

### Issue 2: Build Errors

**Symptoms**: Deployment fails or functions show errors in logs

**Check**:
- Go to Deployment → Functions tab
- Look for build errors
- Common issues:
  - Missing dependencies in `package.json`
  - Syntax errors in function files
  - Missing environment variables

### Issue 3: Environment Variables Not Set

**Symptoms**: Functions return 500 errors about missing credentials

**Solution**:
1. Go to **Settings** → **Environment Variables**
2. Add all required variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_VERIFY_SERVICE_SID`
3. **Redeploy** after adding variables

### Issue 4: Wrong Function Format

**Symptoms**: Functions exist but return 404

**Check function format**:
```javascript
// ✅ CORRECT (Vercel format)
module.exports = async (req, res) => {
  return res.json({ success: true });
};

// ❌ WRONG (AWS Lambda format)
exports.handler = async (event, context) => {
  // This won't work on Vercel
};
```

## Testing Steps

1. **Test the test endpoint first**:
   ```
   https://your-project.vercel.app/api/test
   ```
   Should return: `{"success": true, "message": "Vercel serverless function is working!"}`

2. **If test endpoint works**, the issue is with specific functions
3. **If test endpoint doesn't work**, check:
   - Function detection
   - Build errors
   - Deployment status

## Check Deployment Status

1. Go to **Deployments** tab
2. Check the status:
   - ✅ **Ready** = Deployment successful
   - ⚠️ **Building** = Still deploying
   - ❌ **Error** = Check error logs

## Verify Function Files

Make sure these files exist:
- `api/test.js`
- `api/send-otp.js`
- `api/verify-otp.js`

All should export: `module.exports = async (req, res) => {}`

## Still Not Working?

1. Check Vercel logs (most important!)
2. Try redeploying: Deployments → ... → Redeploy
3. Check if functions appear in Vercel Dashboard → Functions tab
4. Verify the project root directory is correct (should be `./`)

