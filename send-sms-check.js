/**
 * Send verification SMS via Twilio Verify (uses .env credentials).
 * Run from verification-server folder: node send-sms-check.js [phoneNumber]
 * Example: node send-sms-check.js +972543456305
 */
const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const phoneNumber = process.argv[2] || '+972543456305';

if (!accountSid || !authToken || !verifyServiceSid) {
  console.error('Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID in .env');
  process.exit(1);
}

const twilio = require('twilio');

async function main() {
  console.log('Sending verification SMS to:', phoneNumber);
  console.log('Using Verify Service:', verifyServiceSid);
  console.log('---');

  try {
    const client = twilio(accountSid, authToken);
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications
      .create({
        to: phoneNumber,
        channel: 'sms',
      });

    console.log('Success!');
    console.log('Verification SID:', verification.sid);
    console.log('Status:', verification.status);
    console.log('Check your phone for the code.');
  } catch (err) {
    console.error('Error:', err.message);
    if (err.code) console.error('Code:', err.code);
  }
}

main();
