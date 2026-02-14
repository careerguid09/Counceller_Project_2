
const { Resend } = require('resend');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m"
};

class EmailService {
  constructor() {
    console.log(`\n${colors.magenta}════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.cyan}📧 EMAIL SERVICE (RESEND)${colors.reset}`);
    console.log(`${colors.magenta}════════════════════════════════════════════${colors.reset}`);
    
    this.checkEnvVars();
    this.initResend();
    this.setupLogging();
  }

  checkEnvVars() {
    console.log(`\n${colors.yellow}🔍 Environment Check:${colors.reset}`);
    
    // API Key check
    if (!process.env.RESEND_API_KEY) {
      console.log(`${colors.red}❌ RESEND_API_KEY missing${colors.reset}`);
    } else {
      console.log(`${colors.green}✅ RESEND_API_KEY: ${process.env.RESEND_API_KEY.length} chars${colors.reset}`);
    }

    // Company Email check
    if (!process.env.COMPANY_EMAIL) {
      console.log(`${colors.red}❌ COMPANY_EMAIL missing${colors.reset}`);
    } else {
      console.log(`${colors.green}✅ COMPANY_EMAIL: ${process.env.COMPANY_EMAIL}${colors.reset}`);
    }

    // Admin Email check
    if (process.env.ADMIN_EMAIL) {
      console.log(`${colors.green}✅ ADMIN_EMAIL: ${process.env.ADMIN_EMAIL}${colors.reset}`);
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
    this.logDir = path.join(__dirname, "logs");
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
    console.log(`${colors.green}✅ Log directory: ${this.logDir}${colors.reset}`);
    console.log(`${colors.magenta}════════════════════════════════════════════${colors.reset}\n`);
  }

  async sendCareerConfirmation(userEmail, userName, mobileNumber, city, problem) {
    console.log(`\n${colors.blue}📧 Sending email to: ${userEmail}${colors.reset}`);
    
    try {
      // Validation
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured');
      }
      if (!process.env.COMPANY_EMAIL) {
        throw new Error('COMPANY_EMAIL not configured');
      }

      // HTML Template
      const htmlContent = this.getHtmlTemplate(userName, mobileNumber, city, problem);

      // Send email via Resend
      console.log(`${colors.yellow}⏳ Sending via Resend...${colors.reset}`);
      
      const { data, error } = await this.resend.emails.send({
        from: `SS ADMISSION VALA <${process.env.COMPANY_EMAIL}>`,
        to: [userEmail],
        subject: "Career Assistance Request Confirmation - SS ADMISSION VALA",
        html: htmlContent,
        replyTo: process.env.COMPANY_EMAIL,
        ...(process.env.ADMIN_EMAIL && { cc: [process.env.ADMIN_EMAIL] })
      });

      if (error) {
        throw error;
      }

      console.log(`${colors.green}✅ Email sent successfully!${colors.reset}`);
      console.log(`${colors.dim}   ID: ${data?.id}${colors.reset}`);

      // Log success
      this.logToFile('success', {
        userEmail,
        userName,
        messageId: data?.id,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        messageId: data?.id,
        provider: 'resend'
      };

    } catch (error) {
      console.log(`${colors.red}❌ Email failed: ${error.message}${colors.reset}`);
      
      if (error.statusCode === 403) {
        console.log(`${colors.yellow}⚠ Domain not verified!${colors.reset}`);
        console.log(`${colors.blue}🔧 Fix: Add and verify domain in Resend dashboard${colors.reset}`);
      }

      // Log failure
      this.logToFile('failed', {
        userEmail,
        userName,
        error: error.message,
        timestamp: new Date().toISOString()
      });

      // Save to backup
      await this.saveToBackup(userEmail, userName, mobileNumber, city, problem);

      return {
        success: false,
        error: error.message,
        fallbackUsed: true
      };
    }
  }

  getHtmlTemplate(userName, mobileNumber, city, problem) {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
          background-color: #f9fafb; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #ffffff; 
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .header p {
          margin: 5px 0 0;
          opacity: 0.9;
        }
        .content { 
          padding: 40px 30px; 
        }
        .details { 
          background: #f8f9fa; 
          border-left: 4px solid #667eea; 
          padding: 24px; 
          margin: 32px 0; 
          border-radius: 0 8px 8px 0; 
        }
        .details h3 {
          color: #2d3748;
          margin-top: 0;
          margin-bottom: 20px;
        }
        .contact-box {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 20px;
          border-radius: 8px;
          margin: 32px 0;
        }
        .footer { 
          background: #f8f9fa; 
          padding: 25px; 
          text-align: center; 
          color: #6c757d; 
          font-size: 14px; 
          border-top: 1px solid #e9ecef; 
        }
        @media only screen and (max-width: 640px) {
          .content { padding: 20px; }
          .details { padding: 16px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>SS ADMISSION VALA</h1>
          <p>Career Guidance & Professional Development</p>
        </div>
        
        <!-- Content -->
        <div class="content">
          <h2 style="color: #2d3748; margin-top: 0;">Dear ${userName || 'Client'},</h2>
         
          <h4 style="color: #2d3748; margin: 20px 0; font-size: 20px;">
            🎉 Your career query has been received successfully!
          </h4>
         
          <p style="margin-bottom: 24px; color: #4b5563;">
            Thank you for reaching out to <strong>SS ADMISSION VALA</strong> regarding your career aspirations. 
            We have successfully received your query and our team is actively reviewing your case.
          </p>

          <!-- User Details Card -->
          <div class="details">
            <h3>Your Details</h3>
            
            <div style="margin-bottom: 12px;">
              <strong>Full Name:</strong> ${userName || 'Not provided'}
            </div>
            <div style="margin-bottom: 12px;">
              <strong>Mobile Number:</strong> ${mobileNumber || 'Not provided'}
            </div>
            <div style="margin-bottom: 12px;">
              <strong>City:</strong> ${city || 'Not specified'}
            </div>
            <div>
              <strong>Career Query:</strong> ${problem || 'Career guidance query'}
            </div>
          </div>

          <!-- Process Timeline -->
          <div style="margin: 40px 0;">
            <h3 style="color: #111827; text-align: center;">⏳ Your Consultation Journey</h3>
            
            <div style="display: flex; justify-content: space-between; margin-top: 30px;">
              <div style="text-align: center; flex: 1;">
                <div style="width: 40px; height: 40px; background: #7C3AED; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">1</div>
                <p style="font-weight: 600;">Initial Assessment</p>
                <p style="font-size: 12px; color: #666;">4-6 Hours</p>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="width: 40px; height: 40px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">2</div>
                <p style="font-weight: 600;">Strategy</p>
                <p style="font-size: 12px; color: #666;">24 Hours</p>
              </div>
              <div style="text-align: center; flex: 1;">
                <div style="width: 40px; height: 40px; background: #F59E0B; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">3</div>
                <p style="font-weight: 600;">Support</p>
                <p style="font-size: 12px; color: #666;">Ongoing</p>
              </div>
            </div>
          </div>

          <!-- Contact Box -->
          <div class="contact-box">
            <h4 style="color: #856404; margin-top: 0;">📞 Need Immediate Assistance?</h4>
            <div style="margin-bottom: 8px;">
              <strong>Phone:</strong> +91 74156 66361
            </div>
            <div style="margin-bottom: 8px;">
              <strong>Email:</strong> careerguid09@gmail.com
            </div>
            <div>
              <strong>Hours:</strong> Mon-Sat, 9 AM - 8 PM IST
            </div>
          </div>
          
          <p style="margin-top: 30px; color: #4b5563; text-align: center;">
            We're committed to helping you achieve your career goals!
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <p><strong>Career Solutions Team</strong></p>
            <p style="color: #6b7280; font-style: italic;">SS ADMISSION VALA - Shaping Future Professionals</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p>
            <strong>SS ADMISSION VALA Career Services</strong><br>
            Arhedi Road, Shiv City, Ayodhya Nagar, Bhopal
          </p>
          <p style="font-size: 12px; opacity: 0.7;">
            This is an automated message. Please do not reply directly.<br>
            © ${new Date().getFullYear()} SS ADMISSION VALA. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>`;
  }

  logToFile(type, data) {
    try {
      const date = new Date().toISOString().split('T')[0];
      const logFile = path.join(this.logDir, `email-${date}.json`);
      
      let logs = [];
      if (fs.existsSync(logFile)) {
        logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
      }
      
      logs.push(data);
      fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    } catch (err) {
      // Silent fail
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
        problem,
        status: 'pending'
      });
      
      fs.writeFileSync(backupFile, JSON.stringify(backups, null, 2));
      console.log(`${colors.green}✅ Backup saved${colors.reset}`);
    } catch (err) {
      console.log(`${colors.red}❌ Backup failed: ${err.message}${colors.reset}`);
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

// Export function
const sendCareerEmail = async (userEmail, userName, mobileNumber, city, problem) => {
  return await emailService.sendCareerConfirmation(
    userEmail, userName, mobileNumber, city, problem
  );
};

module.exports = { sendCareerEmail, emailService };