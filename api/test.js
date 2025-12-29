// Simple test endpoint to verify Vercel functions are working
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET and POST requests
  return res.status(200).json({
    success: true,
    message: 'Vercel serverless function is working!',
    method: req.method,
    url: req.url,
    path: req.url,
    timestamp: new Date().toISOString(),
    environment: {
      hasTwilioAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasTwilioAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasVerifyServiceSid: !!process.env.TWILIO_VERIFY_SERVICE_SID
    }
  });
};

