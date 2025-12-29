// Vercel Serverless Function - Send OTP via Twilio
const twilio = require('twilio');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET requests with helpful message
  if (req.method === 'GET') {
    return res.status(200).json({
      success: false,
      message: 'This endpoint requires a POST request',
      usage: {
        method: 'POST',
        url: '/api/send-otp',
        body: {
          phoneNumber: '+9720543456305'
        }
      },
      example: 'Use this endpoint from your HTML form, not directly in browser'
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST method.' });
  }

  try {
    // Get environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

    // Validate environment variables
    if (!accountSid || !authToken || !verifyServiceSid) {
      return res.status(500).json({ 
        success: false, 
        error: 'Server configuration error. Missing Twilio credentials.' 
      });
    }

    // Parse request body - Vercel automatically parses JSON
    let body = req.body;
    
    // If body is a string, parse it
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Invalid JSON in request body' });
      }
    }
    
    const { phoneNumber } = body || {};

    if (!phoneNumber) {
      return res.status(400).json({ success: false, error: 'Phone number is required' });
    }

    // Create Twilio client
    const client = twilio(accountSid, authToken);

    // Send verification code
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications
      .create({ 
        to: phoneNumber, 
        channel: 'sms' 
      });

    return res.status(200).json({
      success: true,
      verificationSid: verification.sid,
      message: 'Verification code sent'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send verification code'
    });
  }
};

