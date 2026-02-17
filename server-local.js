/**
 * Run verification API locally with .env credentials.
 * Usage: node --env-file=.env server-local.js
 * Then: POST http://localhost:3333/api/send-otp with body { "phoneNumber": "+972..." }
 */
const express = require('express');

if (!process.env.TWILIO_ACCOUNT_SID) {
  console.warn('No TWILIO_ACCOUNT_SID. Run: node --env-file=.env server-local.js');
}

const sendOtp = require('./api/send-otp');
const app = express();
app.use(express.json());
app.use(express.text({ type: '*/*' }));

app.all('/api/send-otp', async (req, res) => {
  try {
    await sendOtp(req, res);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
});

const PORT = process.env.PORT || 3334;
app.listen(PORT, () => {
  console.log('Local verification server: http://localhost:' + PORT + '/api/send-otp');
  console.log('Credentials from .env');
});
