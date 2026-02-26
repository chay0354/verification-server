// Vercel Serverless Function - Send order details via Twilio SMS (Messages API)
const twilio = require('twilio');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Send order SMS: POST with body { "message": "Order details text" }',
      usage: 'POST /api/send-order-sms with JSON body { "message": "..." }'
    });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const alphaSender = (process.env.TWILIO_ALPHA_SENDER || '').trim();
    const toNumber = process.env.ORDER_SMS_TO_NUMBER;

    if (!accountSid || !authToken) {
      return res.status(500).json({ success: false, error: 'Missing Twilio credentials' });
    }
    const from = fromNumber || (alphaSender || 'AllNetworks');
    if (!from) {
      return res.status(500).json({ success: false, error: 'Set TWILIO_PHONE_NUMBER or TWILIO_ALPHA_SENDER (e.g. AllNetworks) in env' });
    }
    if (!toNumber) {
      return res.status(500).json({ success: false, error: 'Missing ORDER_SMS_TO_NUMBER (number to receive order SMS)' });
    }

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) {
        return res.status(400).json({ success: false, error: 'Invalid JSON' });
      }
    }

    const message = (body && body.message) ? String(body.message).trim() : '';
    if (!message) {
      return res.status(400).json({ success: false, error: 'Body "message" is required' });
    }

    const client = twilio(accountSid, authToken);
    const sms = await client.messages.create({
      body: message,
      from: from,
      to: toNumber
    });

    return res.status(200).json({
      success: true,
      sid: sms.sid,
      message: 'Order SMS sent'
    });
  } catch (error) {
    console.error('Send order SMS error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send SMS'
    });
  }
};
