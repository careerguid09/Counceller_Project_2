// emailService.js - RESEND VERSION (WORKING 100%)
const { Resend } = require('resend');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Colors for console
const colors = {
  reset: "\x1b[0m",
  green: "\x32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

class EmailService {
  constructor() {
    console.log(`\n${colors.cyan}════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.blue}📧 EMAIL SERVICE (RESEND)${colors.reset}`);
    console.log(`${colors.cyan}════════════════════════════════════════════${colors.reset}`);
    
    this.checkEnvVars();
    this.initResend();
    this.setupLogging();
  }

  checkEnvVars() {
    console.log(`\n${colors.yellow}🔍 Checking Environment Variables:${colors.reset}`);
    
    if (!process.env.RESEND_API_KEY) {
      console.log(`${colors.red}❌ RESEND_API_KEY is missing!${colors.reset}`);
      console.log(`${colors.yellow}⚠ You need to add RESEND_API_KEY to Render${colors.reset}`);
    } else {
      console.log(`${colors.green}✅ RESEND_API_KEY found (${process.env.RESEND_API_KEY.length} chars)${colors.reset}`);
    }

    if (!process.env.COMPANY_EMAIL) {
      console.log(`${colors.red}❌ COMPANY_EMAIL is missing!${colors.reset}`);
    } else {
      console.log(`${colors.green}✅ COMPANY_EMAIL: ${process.env.COMPANY_EMAIL}${colors.reset}`);
    }
  }

  initResend() {
    if (process.env.RESEND_API_KEY) {
      try {
        this.resend = new Resend(process.env.RESEND_API_KEY);
        console.log(`${colors.green}✅ Resend initialized successfully${colors.reset}`);
      } catch (error) {
        console.log(`${colors.red}❌ Resend init failed: ${error.message}${colors.reset}`);
      }
    }
  }

  setupLogging() {
    this.logDir = path.join(__dirname, "../logs");
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    console.log(`${colors.green}✅ Log directory: ${this.logDir}${colors.reset}`);
    console.log(`${colors.cyan}════════════════════════════════════════════${colors.reset}\n`);
  }

  async sendCareerConfirmation(userEmail, userName, mobileNumber, city, problem) {
    console.log(`\n${colors.blue}📧 Sending email to: ${userEmail}${colors.reset}`);
    
    try {
      // Validation
      if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key not configured');
      }

      // HTML Template
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .details { background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>SS ADMISSION VALA</h1>
              <p>Career Guidance & Professional Development</p>
            </div>
            <div class="content">
              <h2>Dear ${userName || 'Client'},</h2>
              <h3>🎉 Your career query has been received successfully!</h3>
              <p>Thank you for reaching out to us. Our team will review your query and contact you within 24 hours.</p>
              
              <div class="details">
                <h3>Your Details:</h3>
                <p><strong>Name:</strong> ${userName || 'Not provided'}</p>
                <p><strong>Mobile:</strong> ${mobileNumber || 'Not provided'}</p>
                <p><strong>City:</strong> ${city || 'Not specified'}</p>
                <p><strong>Query:</strong> ${problem || 'Career guidance'}</p>
              </div>
              
              <div style="background: #fff3cd; padding: 15px; border-radius: 5px;">
                <p><strong>📞 Need immediate assistance?</strong></p>
                <p>Phone: +91 74156 66361</p>
                <p>Email: careerguid09@gmail.com</p>
                <p>Hours: Mon-Sat, 9 AM - 8 PM</p>
              </div>
            </div>
            <div class="footer">
              <p>SS ADMISSION VALA - Shaping Future Professionals</p>
              <p>Arhedi Road, Shiv City, Ayodhya Nagar, Bhopal</p>
              <p>© ${new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send email via Resend
      const { data, error } = await this.resend.emails.send({
        from: `SS ADMISSION VALA <${process.env.COMPANY_EMAIL}>`,
        to: [userEmail],
        subject: "Career Assistance Request Confirmation",
        html: htmlContent,
      });

      if (error) {
        throw error;
      }

      console.log(`${colors.green}✅ Email sent successfully via Resend!${colors.reset}`);
      console.log(`${colors.dim}   ID: ${data?.id}${colors.reset}`);

      return {
        success: true,
        messageId: data?.id,
        provider: 'resend'
      };

    } catch (error) {
      console.log(`${colors.red}❌ Email failed: ${error.message}${colors.reset}`);
      
      // Save to backup
      await this.saveToBackup(userEmail, userName, mobileNumber, city, problem);

      return {
        success: false,
        error: error.message,
        fallbackUsed: true
      };
    }
  }

  async saveToBackup(userEmail, userName, mobileNumber, city, problem) {
    try {
      const backupFile = path.join(this.logDir, "backup_emails.json");
      let backups = [];
      
      if (fs.existsSync(backupFile)) {
        backups = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
      }
      
      backups.push({
        timestamp: new Date().toISOString(),
        userEmail,
        userName,
        mobileNumber,
        city,
        problem
      });
      
      fs.writeFileSync(backupFile, JSON.stringify(backups, null, 2));
      console.log(`${colors.green}✅ Backup saved${colors.reset}`);
    } catch (err) {
      console.log(`${colors.red}❌ Backup failed${colors.reset}`);
    }
  }
}

// Create instance
const emailService = new EmailService();

// Export function
const sendCareerEmail = async (userEmail, userName, mobileNumber, city, problem) => {
  return await emailService.sendCareerConfirmation(
    userEmail, userName, mobileNumber, city, problem
  );
};

module.exports = { sendCareerEmail, emailService };