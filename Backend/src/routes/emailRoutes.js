const express = require('express');
const router = express.Router();
const { sendCareerEmail } = require('../config/emailConfig');

// Email send karne ka endpoint
router.post('/send-career-email', async (req, res) => {
  try {
    const { userEmail, userName, mobileNumber, city, problem } = req.body;

    // Validation
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    console.log(`📨 Received email request for: ${userEmail}`);

    // Email send karo
    const result = await sendCareerEmail(
      userEmail,
      userName || 'Client',
      mobileNumber || 'Not provided',
      city || 'Not specified',
      problem || 'Career guidance query'
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.error
      });
    }

  } catch (error) {
    console.error('❌ Email route error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Test route for email
router.get('/test-email', (req, res) => {
  res.json({
    success: true,
    message: 'Email service is ready',
    endpoints: {
      send: 'POST /api/send-career-email'
    }
  });
});

module.exports = router;