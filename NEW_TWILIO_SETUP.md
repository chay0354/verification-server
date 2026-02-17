# New Twilio account – connect to your verification server

Do these steps once for your new Twilio account.

---

## Step 1: Get Account SID and Auth Token

1. Go to **[Twilio Console](https://console.twilio.com)** and sign in with the **new** account.
2. On the **Dashboard** (home), you’ll see:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click “Show” to reveal it)
3. Copy both and keep them somewhere safe (you’ll paste them into Vercel in Step 3).

---

## Step 2: Create a Verify service (if you don’t have one)

1. In the left sidebar click **✔ Verify** → **Services** (or **Verify** → **Services**).
2. Click **Create new** (or **+**).
3. Give it a name (e.g. “AllNetworks OTP”) and click **Create**.
4. On the service page you’ll see **Service SID** (starts with `VA...`). Copy it — this is your **Verify Service SID**.

---

## Step 3: Add the 3 values to Vercel (verification server)

Your backend runs on Vercel at `verification-server-livid.vercel.app`. It reads Twilio from **Environment Variables**.

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)** and sign in.
2. Open the project that hosts the **verification server** (the one that deploys `verification-server`, not the main website).
3. Go to **Settings** → **Environment Variables**.
4. Add or update these **three** variables (use the values from your **new** Twilio account):

   | Name | Value | Environment |
   |------|--------|-------------|
   | `TWILIO_ACCOUNT_SID` | Your new Account SID (`AC...`) | Production (and Preview if you use it) |
   | `TWILIO_AUTH_TOKEN` | Your new Auth Token | Production (and Preview) |
   | `TWILIO_VERIFY_SERVICE_SID` | Your new Verify Service SID (`VA...`) | Production (and Preview) |

5. Save. If the variables already existed, **overwrite** them with the new account’s values.

---

## Step 4: Redeploy so Vercel uses the new values

1. In the same Vercel project, open the **Deployments** tab.
2. Click the **⋮** (three dots) on the latest deployment → **Redeploy** (or push a small change to trigger a new deploy).
3. Wait until the new deployment is **Ready**.

---

## Step 5: Test

1. Open your site (local or Vercel) and go to the step where you enter the phone number and click **Send Verification Code**.
2. Use a number you can receive SMS on (e.g. +972543456305).
3. You should get the code and be able to verify.

If it still fails, run the test script again:

```bash
cd c:\projects\sim-website
node test-send-sms.js
```

Check the error message. For a **new** account, also check in Twilio:

- **Messaging** → Geo permissions: **Israel** enabled for SMS (if you send to Israel).
- If the account is **Trial**: either **verify** the test number in **Phone Numbers → Verified Caller IDs**, or **upgrade** the account to send to any number.

---

## Checklist

- [ ] New Twilio: Account SID and Auth Token copied
- [ ] New Twilio: Verify service created, Service SID (`VA...`) copied
- [ ] Vercel: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID` set (new values)
- [ ] Vercel: Redeployed the verification server
- [ ] Tested send OTP on your site or with `node test-send-sms.js`

Your **website** (index.html) does not need any change — it already calls `https://verification-server-livid.vercel.app/api`. Only the **Vercel env vars** for that backend must use the new Twilio credentials.
