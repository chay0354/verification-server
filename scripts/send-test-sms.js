// One-off test: send SMS to a given number using .env credentials.
// Usage: node scripts/send-test-sms.js [to_number] [message]
// Example: node scripts/send-test-sms.js +972543456305 "Test from AllNetworks"
const path = require('path');
const fs = require('fs');

// Load .env from project root (verification-server)
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const to = process.argv[2] || process.env.ORDER_SMS_TO_NUMBER;
const body = process.argv[3] || 'Test SMS from AllNetworks';

if (!to) {
  console.error('Usage: node scripts/send-test-sms.js <to_number> [message]');
  process.exit(1);
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  console.error('Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_PHONE_NUMBER in .env');
  process.exit(1);
}

// Normalize Israeli local number (054...) to E.164
let toE164 = to.trim();
if (toE164.startsWith('0')) {
  toE164 = '+972' + toE164.slice(1);
} else if (!toE164.startsWith('+')) {
  toE164 = '+' + toE164;
}

const twilio = require('twilio');
const client = twilio(accountSid, authToken);

client.messages
  .create({ body, from: fromNumber, to: toE164 })
  .then(msg => {
    console.log('Sent. SID:', msg.sid);
    console.log('To:', toE164);
  })
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
