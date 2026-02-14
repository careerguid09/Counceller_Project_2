const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const os = require("os");
require("dotenv").config();

// ==================== ENHANCED DEBUG CONFIG ====================
const DEBUG_CONFIG = {
  SHOW_ENV_VARS: true,
  SHOW_SMTP_CONFIG: true,
  SHOW_FULL_ERROR: true,
  LOG_TO_FILE: true,
  COLOR_CODED: true,
};

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

const EMAIL_CONFIG = {
  service: "gmail",
  auth: {
    user: process.env.COMPANY_EMAIL,
    pass: process.env.COMPANY_EMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 10,
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
};

// ==================== ENHANCED DEBUGGER CLASS ====================
class EmailDebugger {
  constructor() {
    this.debugDir = path.join(__dirname, "../debug-logs");
    this.sessionId = this.generateSessionId();
    this.setupDebugDirectory();
    this.logSystemInfo();
  }

  generateSessionId() {
    return `SESS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  setupDebugDirectory() {
    if (!fs.existsSync(this.debugDir)) {
      fs.mkdirSync(this.debugDir, { recursive: true });
    }
  }

  logSystemInfo() {
    const systemInfo = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      hostname: os.hostname(),
      env: process.env.NODE_ENV,
      pid: process.pid,
      cwd: process.cwd(),
    };

    this.writeToFile('system-info.json', systemInfo);
    
    if (DEBUG_CONFIG.SHOW_ENV_VARS) {
      this.logEnvironmentVariables();
    }
  }

  logEnvironmentVariables() {
    console.log(`\n${colors.bgBlue}${colors.white} ENVIRONMENT VARIABLES CHECK ${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    const envVars = {
      COMPANY_EMAIL: process.env.COMPANY_EMAIL ? '✅ SET' : '❌ MISSING',
      COMPANY_EMAIL_PASS: process.env.COMPANY_EMAIL_PASS ? '✅ SET' : '❌ MISSING',
      ADMIN_EMAIL: process.env.ADMIN_EMAIL ? '✅ SET' : '❌ MISSING',
      NODE_ENV: process.env.NODE_ENV || 'not set',
    };

    if (process.env.COMPANY_EMAIL) {
      console.log(`${colors.green}✓ COMPANY_EMAIL:${colors.reset} ${process.env.COMPANY_EMAIL}`);
    } else {
      console.log(`${colors.red}✗ COMPANY_EMAIL:${colors.reset} Not Set`);
    }

    if (process.env.COMPANY_EMAIL_PASS) {
      const passLength = process.env.COMPANY_EMAIL_PASS.length;
      console.log(`${colors.green}✓ COMPANY_EMAIL_PASS:${colors.reset} [${passLength} characters]`);
      
      // Check if it's an App Password (16 chars without spaces)
      if (passLength === 16 && /^[a-z]{16}$/.test(process.env.COMPANY_EMAIL_PASS)) {
        console.log(`${colors.green}✓ Password Format:${colors.reset} Valid App Password`);
      } else if (passLength > 0) {
        console.log(`${colors.yellow}⚠ Password Format:${colors.reset} May not be App Password (should be 16 lowercase letters)`);
      }
    } else {
      console.log(`${colors.red}✗ COMPANY_EMAIL_PASS:${colors.reset} Not Set`);
    }

    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  }

  logSMTPConfig() {
    if (!DEBUG_CONFIG.SHOW_SMTP_CONFIG) return;

    console.log(`\n${colors.bgBlue}${colors.white} SMTP CONFIGURATION ${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.white}Service:${colors.reset} Gmail`);
    console.log(`${colors.white}User:${colors.reset} ${EMAIL_CONFIG.auth.user || 'Not set'}`);
    console.log(`${colors.white}Password:${colors.reset} ${EMAIL_CONFIG.auth.pass ? '******' : 'Not set'}`);
    console.log(`${colors.white}Pool:${colors.reset} ${EMAIL_CONFIG.pool}`);
    console.log(`${colors.white}Secure:${colors.reset} ${EMAIL_CONFIG.secure}`);
    console.log(`${colors.white}Timeout:${colors.reset} ${EMAIL_CONFIG.connectionTimeout}ms`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  }

  logError(error, context = {}) {
    const timestamp = new Date().toISOString();
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    const errorDetails = {
      id: errorId,
      timestamp,
      sessionId: this.sessionId,
      name: error.name || 'UnknownError',
      message: error.message || 'No message',
      code: error.code || 'NO_CODE',
      stack: error.stack || 'No stack trace',
      command: error.command || null,
      response: error.response || null,
      responseCode: error.responseCode || null,
      errno: error.errno || null,
      syscall: error.syscall || null,
      port: error.port || null,
      address: error.address || null,
      context: context,
    };

    // Console output with colors
    console.log(`\n${colors.bgRed}${colors.white} ERROR DETECTED [${errorId}] ${colors.reset}`);
    console.log(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.yellow}Timestamp:${colors.reset} ${timestamp}`);
    console.log(`${colors.yellow}Session ID:${colors.reset} ${this.sessionId}`);
    console.log(`${colors.yellow}Error Type:${colors.reset} ${colors.red}${errorDetails.name}${colors.reset}`);
    console.log(`${colors.yellow}Error Code:${colors.reset} ${colors.magenta}${errorDetails.code}${colors.reset}`);
    console.log(`${colors.yellow}Message:${colors.reset} ${errorDetails.message}`);

    if (errorDetails.response) {
      console.log(`${colors.yellow}SMTP Response:${colors.reset} ${errorDetails.response}`);
    }

    if (errorDetails.responseCode) {
      console.log(`${colors.yellow}Response Code:${colors.reset} ${errorDetails.responseCode}`);
    }

    if (errorDetails.command) {
      console.log(`${colors.yellow}SMTP Command:${colors.reset} ${errorDetails.command}`);
    }

    console.log(`${colors.yellow}Context:${colors.reset}`);
    Object.entries(context).forEach(([key, value]) => {
      console.log(`  ${colors.cyan}${key}:${colors.reset} ${value || 'N/A'}`);
    });

    if (DEBUG_CONFIG.SHOW_FULL_ERROR && errorDetails.stack) {
      console.log(`\n${colors.yellow}Stack Trace:${colors.reset}`);
      console.log(errorDetails.stack.split('\n').map(line => `  ${line}`).join('\n'));
    }

    console.log(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    // Write to file
    if (DEBUG_CONFIG.LOG_TO_FILE) {
      this.writeToFile(`errors-${new Date().toISOString().split('T')[0]}.json`, errorDetails);
    }

    return errorDetails;
  }

  logEmailAttempt(emailData) {
    const timestamp = new Date().toISOString();
    const attemptId = `ATT-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    console.log(`\n${colors.bgBlue}${colors.white} EMAIL ATTEMPT [${attemptId}] ${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.white}To:${colors.reset} ${emailData.userEmail}`);
    console.log(`${colors.white}Name:${colors.reset} ${emailData.userName}`);
    console.log(`${colors.white}Mobile:${colors.reset} ${emailData.mobileNumber}`);
    console.log(`${colors.white}City:${colors.reset} ${emailData.city}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    const attemptLog = {
      attemptId,
      timestamp,
      sessionId: this.sessionId,
      ...emailData
    };

    this.writeToFile(`email-attempts-${new Date().toISOString().split('T')[0]}.json`, attemptLog);
  }

  logSuccess(result, emailData) {
    const timestamp = new Date().toISOString();
    const successId = `SUC-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    console.log(`\n${colors.bgGreen}${colors.white} EMAIL SUCCESS [${successId}] ${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.white}To:${colors.reset} ${emailData.userEmail}`);
    console.log(`${colors.white}Message ID:${colors.reset} ${result.messageId}`);
    console.log(`${colors.white}Duration:${colors.reset} ${result.duration}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    const successLog = {
      successId,
      timestamp,
      sessionId: this.sessionId,
      result,
      emailData
    };

    this.writeToFile(`success-${new Date().toISOString().split('T')[0]}.json`, successLog);
  }

  writeToFile(filename, data) {
    try {
      const filepath = path.join(this.debugDir, filename);
      let existingData = [];

      if (fs.existsSync(filepath)) {
        const content = fs.readFileSync(filepath, 'utf8');
        existingData = JSON.parse(content);
      }

      if (!Array.isArray(existingData)) {
        existingData = [existingData];
      }

      existingData.push({
        ...data,
        loggedAt: new Date().toISOString()
      });

      // Keep only last 100 entries
      if (existingData.length > 100) {
        existingData = existingData.slice(-100);
      }

      fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
    } catch (err) {
      console.error(`${colors.red}Failed to write debug log:${colors.reset}`, err.message);
    }
  }

  generateErrorReport() {
    console.log(`\n${colors.bgYellow}${colors.white} ERROR SUMMARY REPORT ${colors.reset}`);
    console.log(`${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.white}Session ID:${colors.reset} ${this.sessionId}`);
    console.log(`${colors.white}Debug Directory:${colors.reset} ${this.debugDir}`);
    console.log(`${colors.white}To view full logs:${colors.reset}`);
    console.log(`  cat ${this.debugDir}/*.json`);
    console.log(`${colors.yellow}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  }
}

// ==================== MODIFIED EMAIL SERVICE WITH DEBUGGING ====================
class EmailService {
  constructor() {
    this.debugger = new EmailDebugger();
    this.transporter = nodemailer.createTransport(EMAIL_CONFIG);
    this.isConnectionVerified = false;
    this.setupErrorLogging();
    
    // Log initial configuration
    this.debugger.logEnvironmentVariables();
    this.debugger.logSMTPConfig();
    
    this.preVerifyConnection();
  }

  setupErrorLogging() {
    this.logDir = path.join(__dirname, "../logs/email");
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  async preVerifyConnection() {
    try {
      console.log(`${colors.cyan}🔄 Testing SMTP connection...${colors.reset}`);
      await this.transporter.verify();
      this.isConnectionVerified = true;
      console.log(`${colors.green}✅ SMTP Connection Successful!${colors.reset}`);
      console.log(`${colors.green}   Server: smtp.gmail.com:465${colors.reset}`);
      console.log(`${colors.green}   User: ${EMAIL_CONFIG.auth.user}${colors.reset}\n`);
    } catch (error) {
      console.log(`${colors.red}❌ SMTP Connection Failed!${colors.reset}`);
      this.debugger.logError(error, { stage: 'pre-verification' });
      this.isConnectionVerified = false;
    }
  }

  async sendCareerConfirmation(userEmail, userName, mobileNumber, city, problem) {
    const startTime = Date.now();
    
    // Log email attempt
    this.debugger.logEmailAttempt({ userEmail, userName, mobileNumber, city, problem });

    try {
      // Check environment variables first
      if (!process.env.COMPANY_EMAIL || !process.env.COMPANY_EMAIL_PASS) {
        throw new Error('Email credentials not configured in environment variables');
      }

      const template = EMAIL_TEMPLATES.careerConfirmation(
        userName || "Client",
        mobileNumber || "Not provided",
        city || "Not specified",
        problem || "Career guidance query",
      );

      const mailOptions = {
        from: `"SS ADMISSION VALA" <${EMAIL_CONFIG.auth.user}>`,
        to: userEmail,
        cc: process.env.ADMIN_EMAIL,
        replyTo: "careerguid09@gmail.com",
        subject: template.subject,
        html: template.html,
        text: `Hello ${userName || "Client"}, your career query has been received.`,
      };

      if (!this.isConnectionVerified) {
        console.log(`${colors.yellow}🔄 Verifying connection before send...${colors.reset}`);
        await this.transporter.verify();
        this.isConnectionVerified = true;
        console.log(`${colors.green}✅ Connection verified${colors.reset}`);
      }

      console.log(`${colors.cyan}📤 Sending email to ${userEmail}...${colors.reset}`);
      
      const info = await this.transporter.sendMail(mailOptions);
      const duration = Date.now() - startTime;

      // Log success
      this.debugger.logSuccess({ 
        messageId: info.messageId, 
        duration: `${duration}ms` 
      }, { userEmail, userName });

      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        duration: `${duration}ms`,
      };

    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Enhanced error logging
      const errorContext = {
        userEmail,
        userName,
        mobileNumber,
        city,
        stage: 'sending',
        duration: `${duration}ms`
      };

      this.debugger.logError(error, errorContext);

      // Save to backup
      await this.saveToBackup(userEmail, userName, mobileNumber, city, problem);

      return {
        success: false,
        error: error.message,
        code: error.code,
        response: error.response,
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
      console.error(`${colors.red}❌ Backup failed:${colors.reset}`, backupError.message);
      return false;
    }
  }
}

// ==================== MAIN EXPORT FUNCTION ====================
const emailService = new EmailService();

const sendCareerEmail = async (userEmail, userName, mobileNumber, city, problem) => {
  console.log(`\n${colors.bright}${colors.blue}🚀 EMAIL SERVICE INITIATED${colors.reset}`);
  console.log(`${colors.dim}${new Date().toLocaleString()}${colors.reset}`);
  
  const result = await emailService.sendCareerConfirmation(
    userEmail, userName, mobileNumber, city, problem
  );

  // Generate error report if failed
  if (!result.success) {
    emailService.debugger.generateErrorReport();
  }

  return result;
};

module.exports = {
  sendCareerEmail,
  emailService,
  EmailService,
};