const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dns = require('dns');
require("dotenv").config();

// ==================== FORCE IPv4 FOR ALL CONNECTIONS ====================
// This is critical for Render.com to prevent IPv6 connection errors
dns.setDefaultResultOrder('ipv4first');

// ==================== COLOR CODES FOR CONSOLE ====================
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
};

// ==================== FIXED EMAIL CONFIGURATION WITH IPv4 FORCING ====================
const EMAIL_CONFIG = {
  // Explicit Gmail SMTP settings
  host: "smtp.gmail.com",
  port: 465,                    // SSL port
  secure: true,                  // Use SSL
  
  // Authentication
  auth: {
    user: process.env.COMPANY_EMAIL,
    pass: process.env.COMPANY_EMAIL_PASS,
  },
  
  // Connection pooling
  pool: true,
  maxConnections: 3,
  maxMessages: 50,
  rateDelta: 1000,
  rateLimit: 5,
  
  // ⭐ CRITICAL: Force IPv4 only (this fixes the Render.com issue)
  family: 4,
  
  // Timeouts (increased for production)
  connectionTimeout: 60000,      // 60 seconds
  greetingTimeout: 30000,        // 30 seconds
  socketTimeout: 60000,          // 60 seconds
  
  // TLS settings
  tls: {
    rejectUnauthorized: false,    // Accept self-signed certs
    ciphers: 'SSLv3'
  },
  
  // Debug options (disable in production if too verbose)
  logger: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
};

// Alternative configuration for port 587 (if 465 doesn't work)
const EMAIL_CONFIG_ALT = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.COMPANY_EMAIL,
    pass: process.env.COMPANY_EMAIL_PASS,
  },
  pool: true,
  maxConnections: 3,
  family: 4,                     // Still force IPv4
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
};

const EMAIL_TEMPLATES = {
  careerConfirmation: (userName, mobileNumber, city, problem) => ({
    subject: "Career Assistance Request Confirmation - SS ADMISSION VALA",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Career Query Confirmation</title>
        <style>
          @media only screen and (max-width: 640px) {
            .container { width: 100% !important; }
            .mobile-px-4 { padding-left: 16px !important; padding-right: 16px !important; }
            .mobile-px-2 { padding-left: 8px !important; padding-right: 8px !important; }
            .mobile-py-8 { padding-top: 32px !important; padding-bottom: 32px !important; }
            .mobile-py-6 { padding-top: 24px !important; padding-bottom: 24px !important; }
            .mobile-text-center { text-align: center !important; }
            .mobile-flex-col { display: flex !important; flex-direction: column !important; }
            .mobile-block { display: block !important; width: 100% !important; }
            .mobile-mt-4 { margin-top: 16px !important; }
            .mobile-mt-6 { margin-top: 24px !important; }
            .mobile-mb-4 { margin-bottom: 16px !important; }
            .mobile-mb-6 { margin-bottom: 24px !important; }
            .mobile-text-lg { font-size: 18px !important; }
            .mobile-text-base { font-size: 16px !important; }
            .mobile-text-sm { font-size: 14px !important; }
            .mobile-text-xs { font-size: 12px !important; }
            .mobile-hide { display: none !important; }
            .mobile-show { display: block !important; }
          }
        </style>
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
        <!-- Main Container -->
        <div class="container" style="max-width: 600px; margin: 0 auto; background: #ffffff;">
          
          <!-- Header -->
          <div class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;" class="mobile-text-lg">SS ADMISSION VALA</h1>
            <p style="margin: 5px 0 0; opacity: 0.9;" class="mobile-text-sm mobile-mt-4">Career Guidance & Professional Development</p>
          </div>
          
          <!-- Content -->
          <div class="content mobile-px-4" style="padding: 40px 30px;">
            <h2 style="color: #2d3748; margin-top: 0; font-size: 24px;" class="mobile-text-base mobile-text-center">Dear ${userName},</h2>
           
            <h4 class="my-2" style="color: #2d3748; margin-top: 0; margin-bottom: 20px; font-size: 20px;" class="mobile-text-base mobile-text-center mobile-mt-4">🎉 Your career query has been received successfully!</h4>
           
            <p style="margin-bottom: 24px; color: #4b5563; font-size: 16px;" class="mobile-text-sm mobile-text-center">
              Thank you for reaching out to <strong>SS ADMISSION VALA</strong> regarding your career aspirations. We have successfully received your query and our team is actively reviewing your case.
            </p>

            <!-- User Details Card -->
            <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 24px; margin: 32px 0; border-radius: 0 8px 8px 0;" class="mobile-px-2 mobile-py-6">
              <h3 style="color: #2d3748; margin-top: 0; margin-bottom: 20px; font-size: 20px;" class="mobile-text-base mobile-text-center">Your Details</h3>
              
              <div style="margin-bottom: 16px; display: flex;" class="mobile-flex-col mobile-mb-4">
                <span style="font-weight: 600; color: #495057; min-width: 140px; margin-bottom: 4px;" class="mobile-block mobile-mb-2">Full Name:</span>
                <span style="color: #212529; flex: 1;" class="mobile-block">${userName}</span>
              </div>
              
              <div style="margin-bottom: 16px; display: flex;" class="mobile-flex-col mobile-mb-4">
                <span style="font-weight: 600; color: #495057; min-width: 140px; margin-bottom: 4px;" class="mobile-block mobile-mb-2">Mobile Number:</span>
                <span style="color: #212529; flex: 1;" class="mobile-block">${mobileNumber}</span>
              </div>
              
              <div style="margin-bottom: 16px; display: flex;" class="mobile-flex-col mobile-mb-4">
                <span style="font-weight: 600; color: #495057; min-width: 140px; margin-bottom: 4px;" class="mobile-block mobile-mb-2">City:</span>
                <span style="color: #212529; flex: 1;" class="mobile-block">${city}</span>
              </div>
              
              <div style="display: flex;" class="mobile-flex-col">
                <span style="font-weight: 600; color: #495057; min-width: 140px; margin-bottom: 4px;" class="mobile-block mobile-mb-2">Career Query:</span>
                <span style="color: #212529; flex: 1;" class="mobile-block">${problem}</span>
              </div>
            </div>

            <!-- Process Timeline -->
            <div style="margin: 40px 0;" class="mobile-mt-6 mobile-mb-6">
              <h3 style="color: #111827; margin-top: 0; font-size: 20px; font-weight: 600; text-align: center; margin-bottom: 32px;" class="mobile-text-base mobile-text-center mobile-mb-4">
                <span style="vertical-align: middle; margin-right: 10px;">⏳</span>
                Your Consultation Journey
              </h3>
              
              <!-- Desktop Timeline -->
              <div style="display: flex; justify-content: space-between; position: relative; margin: 40px 0;" class="mobile-hide">
                <!-- Timeline Connector Line -->
                <div style="position: absolute; top: 30px; left: 50px; right: 50px; height: 3px; background: linear-gradient(90deg, #7C3AED, #10B981); z-index: 1; border-radius: 2px;"></div>
                
                <!-- Step 1 -->
                <div style="text-align: center; position: relative; z-index: 2; flex: 1; padding: 0 10px;">
                  <div style="width: 60px; height: 60px; background: white; border: 3px solid #7C3AED; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #7C3AED, #8B5CF6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px;">
                      1
                    </div>
                  </div>
                  <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.1); border: 1px solid #E5E7EB;">
                    <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                      📋 Initial Assessment
                    </div>
                    <div style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-bottom: 12px;">
                      Comprehensive profile analysis by our expert career panel
                    </div>
                    <div style="padding: 8px 12px; background: #F5F3FF; border-radius: 6px; display: inline-block;">
                      <span style="font-size: 12px; color: #7C3AED; font-weight: 600;">
                        ⏱️ 4-6 Hours
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Step 2 -->
                <div style="text-align: center; position: relative; z-index: 2; flex: 1; padding: 0 10px;">
                  <div style="width: 60px; height: 60px; background: white; border: 3px solid #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #10B981, #34D399); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px;">
                      2
                    </div>
                  </div>
                  <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1); border: 1px solid #E5E7EB;">
                    <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                      🎯 Strategy Development
                    </div>
                    <div style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-bottom: 12px;">
                      Personalized career roadmap with actionable milestones
                    </div>
                    <div style="padding: 8px 12px; background: #D1FAE5; border-radius: 6px; display: inline-block;">
                      <span style="font-size: 12px; color: #065F46; font-weight: 600;">
                        📧 Within 24 Hours
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Step 3 -->
                <div style="text-align: center; position: relative; z-index: 2; flex: 1; padding: 0 10px;">
                  <div style="width: 60px; height: 60px; background: white; border: 3px solid #F59E0B; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #F59E0B, #FBBF24); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px;">
                      3
                    </div>
                  </div>
                  <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.1); border: 1px solid #E5E7EB;">
                    <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                      🚀 Implementation Support
                    </div>
                    <div style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-bottom: 12px;">
                      One-on-one consultation and ongoing mentorship sessions
                    </div>
                    <div style="padding: 8px 12px; background: #FEF3C7; border-radius: 6px; display: inline-block;">
                      <span style="font-size: 12px; color: #92400E; font-weight: 600;">
                        📅 Schedule Anytime
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Mobile Timeline -->
              <div style="display: none;" class="mobile-show">
                <!-- Step 1 Mobile -->
                <div style="margin-bottom: 32px; display: flex; align-items: flex-start;">
                  <div style="width: 50px; height: 50px; background: white; border: 3px solid #7C3AED; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #7C3AED, #8B5CF6); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px;">
                      1
                    </div>
                  </div>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 6px;">
                      📋 Initial Assessment
                    </div>
                    <div style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-bottom: 10px;">
                      Comprehensive profile analysis by our expert career panel
                    </div>
                    <div style="padding: 6px 10px; background: #F5F3FF; border-radius: 6px; display: inline-block;">
                      <span style="font-size: 12px; color: #7C3AED; font-weight: 600;">
                        ⏱️ 4-6 Hours
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Step 2 Mobile -->
                <div style="margin-bottom: 32px; display: flex; align-items: flex-start;">
                  <div style="width: 50px; height: 50px; background: white; border: 3px solid #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #10B981, #34D399); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px;">
                      2
                    </div>
                  </div>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 6px;">
                      🎯 Strategy Development
                    </div>
                    <div style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-bottom: 10px;">
                      Personalized career roadmap with actionable milestones
                    </div>
                    <div style="padding: 6px 10px; background: #D1FAE5; border-radius: 6px; display: inline-block;">
                      <span style="font-size: 12px; color: #065F46; font-weight: 600;">
                        📧 Within 24 Hours
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Step 3 Mobile -->
                <div style="display: flex; align-items: flex-start;">
                  <div style="width: 50px; height: 50px; background: white; border: 3px solid #F59E0B; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                    <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #F59E0B, #FBBF24); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px;">
                      3
                    </div>
                  </div>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 6px;">
                      🚀 Implementation Support
                    </div>
                    <div style="font-size: 14px; color: #6B7280; line-height: 1.5; margin-bottom: 10px;">
                      One-on-one consultation and ongoing mentorship sessions
                    </div>
                    <div style="padding: 6px 10px; background: #FEF3C7; border-radius: 6px; display: inline-block;">
                      <span style="font-size: 12px; color: #92400E; font-weight: 600;">
                        📅 Schedule Anytime
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Contact Box -->
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 24px; border-radius: 8px; margin: 32px 0;" class="mobile-px-2 mobile-py-6">
              <h4 style="color: #856404; margin-top: 0; font-size: 18px; margin-bottom: 16px;" class="mobile-text-base mobile-text-center">📞 Need Immediate Assistance?</h4>
              <div style="margin-bottom: 8px;" class="mobile-text-center mobile-mb-4">
                <strong style="color: #856404;">Phone:</strong> 
                <span style="color: #212529;">+91 74156 66361</span>
              </div>
              <div style="margin-bottom: 8px;" class="mobile-text-center mobile-mb-4">
                <strong style="color: #856404;">Email:</strong> 
                <span style="color: #212529;">careerguid09@gmail.com</span>
              </div>
              <div class="mobile-text-center">
                <strong style="color: #856404;">Hours:</strong> 
                <span style="color: #212529;">Mon-Sat, 09 AM TO 08 PM IST</span>
              </div>
            </div>
            
            <p style="margin-top: 30px; color: #4b5563; font-size: 16px; text-align: center;" class="mobile-text-sm mobile-text-center mobile-mt-6">
              We're committed to helping you achieve your career goals!
            </p>
            
            <div style="margin: 30px 0 20px; text-align: center;" class="mobile-text-center mobile-mt-6">
              <p style="margin: 0 0 8px; color: #4b5563;">
                Best regards,
              </p>
              <p style="margin: 0 0 8px;">
                <strong style="color: #667eea;">Career Solutions Team</strong>
              </p>
              <p style="margin: 0; color: #6b7280; font-style: italic;">
                SS ADMISSION VALA - Shaping Future Professionals
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer mobile-px-4" style="background: #f8f9fa; padding: 25px; text-align: center; color: #6c757d; font-size: 14px; border-top: 1px solid #e9ecef;">
            <p style="margin: 0 0 10px;">
              <strong style="color: #374151;">SS ADMISSION VALA Career Services</strong><br>
              <span style="font-size: 13px;">Arhedi Road, Shiv City, Ayodhya Nagar Bhopal</span>
            </p>
            <p style="margin: 0; font-size: 12px; opacity: 0.7;" class="mobile-text-xs">
              This is an automated message. Please do not reply directly.<br>
              © ${new Date().getFullYear()} SS ADMISSION VALA. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// ==================== EMAIL SERVICE CLASS ====================
class EmailService {
  constructor() {
    console.log(`\n${colors.bgBlue}${colors.white} EMAIL SERVICE INITIALIZING ${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    // Check environment variables
    this.checkEnvironmentVariables();
    
    // Initialize transporter with primary config
    this.currentConfig = 'primary';
    this.transporter = nodemailer.createTransport(EMAIL_CONFIG);
    this.isConnectionVerified = false;
    
    // Setup logging
    this.setupErrorLogging();
    
    // Test connection
    this.testConnection();
  }

  checkEnvironmentVariables() {
    console.log(`${colors.yellow}Environment Check:${colors.reset}`);
    console.log(`  COMPANY_EMAIL: ${process.env.COMPANY_EMAIL ? colors.green + '✓ Set' + colors.reset : colors.red + '✗ Missing' + colors.reset}`);
    console.log(`  COMPANY_EMAIL_PASS: ${process.env.COMPANY_EMAIL_PASS ? colors.green + '✓ Set' + colors.reset : colors.red + '✗ Missing' + colors.reset}`);
    console.log(`  ADMIN_EMAIL: ${process.env.ADMIN_EMAIL ? colors.green + '✓ Set' + colors.reset : colors.yellow + '⚠ Optional' + colors.reset}`);
    console.log(`  NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.COMPANY_EMAIL_PASS) {
      const passLength = process.env.COMPANY_EMAIL_PASS.length;
      console.log(`  Password length: ${passLength} characters`);
      
      // Check if it's likely an App Password (16 chars, letters only)
      if (passLength === 16 && /^[a-z]{16}$/.test(process.env.COMPANY_EMAIL_PASS)) {
        console.log(`  ${colors.green}✓ Valid App Password format${colors.reset}`);
      } else if (passLength > 0) {
        console.log(`  ${colors.yellow}⚠ Password may not be App Password (should be 16 lowercase letters)${colors.reset}`);
      }
    }
    
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  }

  setupErrorLogging() {
    this.logDir = path.join(__dirname, "../logs/email");
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
      console.log(`${colors.green}✓ Created log directory: ${this.logDir}${colors.reset}`);
    }
  }

  async testConnection() {
    console.log(`${colors.cyan}🔄 Testing SMTP connection (IPv4 forced, port 465)...${colors.reset}`);
    
    try {
      await this.transporter.verify();
      this.isConnectionVerified = true;
      console.log(`${colors.green}✅ SMTP Connection Successful!${colors.reset}`);
      console.log(`${colors.green}   Server: smtp.gmail.com:465${colors.reset}`);
      console.log(`${colors.green}   Protocol: IPv4 (forced)${colors.reset}`);
      console.log(`${colors.green}   User: ${EMAIL_CONFIG.auth.user}${colors.reset}\n`);
    } catch (error) {
      console.log(`${colors.red}❌ SMTP Connection Failed on port 465${colors.reset}`);
      console.log(`${colors.yellow}   Error: ${error.message}${colors.reset}`);
      console.log(`${colors.yellow}   Code: ${error.code}${colors.reset}`);
      
      // Try alternative port 587
      console.log(`\n${colors.cyan}🔄 Trying alternative port 587...${colors.reset}`);
      
      try {
        this.currentConfig = 'alternative';
        this.transporter = nodemailer.createTransport(EMAIL_CONFIG_ALT);
        await this.transporter.verify();
        this.isConnectionVerified = true;
        console.log(`${colors.green}✅ SMTP Connection Successful on port 587!${colors.reset}`);
        console.log(`${colors.green}   Server: smtp.gmail.com:587 (STARTTLS)${colors.reset}`);
        console.log(`${colors.green}   Protocol: IPv4 (forced)${colors.reset}\n`);
      } catch (altError) {
        console.log(`${colors.red}❌ All connection attempts failed${colors.reset}`);
        console.log(`${colors.red}   Error: ${altError.message}${colors.reset}`);
        console.log(`${colors.red}   Code: ${altError.code}${colors.reset}`);
        console.log(`\n${colors.yellow}⚠ Email service will work in fallback mode (save to backup)${colors.reset}\n`);
        this.isConnectionVerified = false;
      }
    }
  }

  logEmailActivity(type, data) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = { timestamp, type, ...data };

    const logFile = path.join(
      this.logDir,
      `${new Date().toISOString().split("T")[0]}.json`
    );
    
    try {
      let logs = [];
      if (fs.existsSync(logFile)) {
        logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
      }
      logs.push(logEntry);
      fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    } catch (err) {
      // Silent fail for logging
    }

    console.log(`${colors.dim}📧 [${timestamp}] ${type}: ${data.userEmail || "N/A"}${colors.reset}`);
  }

  async sendCareerConfirmation(userEmail, userName, mobileNumber, city, problem) {
    const startTime = Date.now();

    console.log(`\n${colors.cyan}📤 Sending email to: ${userEmail}${colors.reset}`);

    try {
      // Check if we have connection
      if (!this.isConnectionVerified) {
        console.log(`${colors.yellow}⚠ Connection not verified, attempting verification...${colors.reset}`);
        await this.transporter.verify();
        this.isConnectionVerified = true;
        console.log(`${colors.green}✅ Connection verified${colors.reset}`);
      }

      const template = EMAIL_TEMPLATES.careerConfirmation(
        userName || "Client",
        mobileNumber || "Not provided",
        city || "Not specified",
        problem || "Career guidance query"
      );

      const mailOptions = {
        from: `"SS ADMISSION VALA" <${EMAIL_CONFIG.auth.user}>`,
        to: userEmail,
        cc: process.env.ADMIN_EMAIL,
        replyTo: "careerguid09@gmail.com",
        subject: template.subject,
        html: template.html,
        text: `Hello ${userName || "Client"}, your career query has been received. Our team will contact you within 24 hours.`,
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          "Importance": "high",
        },
      };

      const info = await this.transporter.sendMail(mailOptions);
      const duration = Date.now() - startTime;

      // Log success
      setTimeout(() => {
        this.logEmailActivity("SENT", {
          userEmail,
          userName,
          messageId: info.messageId,
          duration: `${duration}ms`,
        });
      }, 0);

      console.log(`${colors.green}✅ Email sent to ${userEmail} in ${duration}ms${colors.reset}`);
      console.log(`${colors.dim}   Message ID: ${info.messageId}${colors.reset}`);

      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        duration: `${duration}ms`,
      };

    } catch (error) {
      const duration = Date.now() - startTime;

      console.error(`${colors.red}❌ Email failed for ${userEmail}${colors.reset}`);
      console.error(`${colors.red}   Error: ${error.message}${colors.reset}`);
      console.error(`${colors.red}   Code: ${error.code}${colors.reset}`);
      
      if (error.command) {
        console.error(`${colors.red}   Command: ${error.command}${colors.reset}`);
      }
      
      if (error.response) {
        console.error(`${colors.red}   Response: ${error.response}${colors.reset}`);
      }

      // Log failure
      setTimeout(() => {
        this.logEmailActivity("FAILED", {
          userEmail,
          userName,
          error: error.message,
          code: error.code,
          duration: `${duration}ms`,
        });
      }, 0);

      // Save to backup
      await this.saveToBackup(userEmail, userName, mobileNumber, city, problem);

      return {
        success: false,
        error: error.message,
        code: error.code,
        fallbackUsed: true,
        duration: `${duration}ms`,
      };
    }
  }

  async saveToBackup(userEmail, userName, mobileNumber, city, problem) {
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        userEmail,
        userName,
        mobileNumber,
        city,
        problem,
        status: "pending_email",
      };

      const backupFile = path.join(this.logDir, "backup_submissions.json");
      let existingData = [];

      if (fs.existsSync(backupFile)) {
        existingData = JSON.parse(fs.readFileSync(backupFile, "utf8"));
      }

      existingData.push(backupData);
      fs.writeFileSync(backupFile, JSON.stringify(existingData, null, 2));

      console.log(`${colors.green}✅ Backup saved for ${userEmail}${colors.reset}`);
      return true;
    } catch (backupError) {
      console.error(`${colors.red}❌ Backup failed: ${backupError.message}${colors.reset}`);
      return false;
    }
  }
}

// ==================== CREATE SINGLETON INSTANCE ====================
const emailService = new EmailService();

// ==================== EXPORT FUNCTION ====================
const sendCareerEmail = async (userEmail, userName, mobileNumber, city, problem) => {
  console.log(`\n${colors.bright}${colors.blue}🚀 EMAIL SERVICE INVOKED${colors.reset}`);
  
  const result = await emailService.sendCareerConfirmation(
    userEmail, userName, mobileNumber, city, problem
  );

  return result;
};

module.exports = {
  sendCareerEmail,
  emailService,
  EmailService,
};