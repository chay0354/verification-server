// Vercel Serverless Function - Verify OTP via Twilio
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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
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
    
    const { phoneNumber, code } = body || {};

    if (!phoneNumber || !code) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and code are required' 
      });
    }

    // Create Twilio client
    const client = twilio(accountSid, authToken);

    // Verify the code
    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks
      .create({ 
        to: phoneNumber, 
        code: code.trim() 
      });

    if (verificationCheck.status === 'approved') {
      return res.status(200).json({
        success: true,
        message: 'Phone number verified successfully'
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification code'
      });
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to verify code'
    });
  }
};

