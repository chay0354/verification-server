// Simple test endpoint to verify Vercel functions are working
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.status(200).json({
    success: true,
    message: 'Vercel serverless function is working!',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });
};

