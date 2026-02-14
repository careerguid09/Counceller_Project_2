// emailService.js - Resend API के साथ कॉन्फ़िगरेशन (Render पर 100% काम करेगा)
const { Resend } = require('resend');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Resend इंस्टेंस बनाएं
const resend = new Resend(process.env.RESEND_API_KEY);

// ==================== EMAIL TEMPLATES ====================
const EMAIL_TEMPLATES = {
  careerConfirmation: (userName, mobileNumber, city, problem) => ({
    subject: "Career Assistance Request Confirmation -SS ADMISSION VALA",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Career Query Confirmation</title>
        <style>
          @media only screen and (max-width: 640px) {
            .container {
              width: 100% !important;
            }
            .mobile-px-4 {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            .mobile-px-2 {
              padding-left: 8px !important;
              padding-right: 8px !important;
            }
            .mobile-py-8 {
              padding-top: 32px !important;
              padding-bottom: 32px !important;
            }
            .mobile-py-6 {
              padding-top: 24px !important;
              padding-bottom: 24px !important;
            }
            .mobile-text-center {
              text-align: center !important;
            }
            .mobile-flex-col {
              display: flex !important;
              flex-direction: column !important;
            }
            .mobile-block {
              display: block !important;
              width: 100% !important;
            }
            .mobile-mt-4 {
              margin-top: 16px !important;
            }
            .mobile-mt-6 {
              margin-top: 24px !important;
            }
            .mobile-mb-4 {
              margin-bottom: 16px !important;
            }
            .mobile-mb-6 {
              margin-bottom: 24px !important;
            }
            .mobile-text-lg {
              font-size: 18px !important;
            }
            .mobile-text-base {
              font-size: 16px !important;
            }
            .mobile-text-sm {
              font-size: 14px !important;
            }
            .mobile-text-xs {
              font-size: 12px !important;
            }
            .mobile-hide {
              display: none !important;
            }
            .mobile-show {
              display: block !important;
            }
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
                <span style="color: #212529;">Mon-Sat,  09 AM TO 08 PM IST</span>
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
              <span style="font-size: 13px;"> Arhedi Road,Shiv City, Ayodhya Nagar Bhopal </span>
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

// ==================== LOGGING SETUP ====================
const logDir = path.join(__dirname, "../logs/email");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logEmailActivity = (type, data) => {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = { timestamp, type, ...data };

  const logFile = path.join(logDir, `${new Date().toISOString().split("T")[0]}.json`);
  let logs = [];

  if (fs.existsSync(logFile)) {
    logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
  }

  logs.push(logEntry);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  console.log(`📧 [${timestamp}] ${type}: ${data.userEmail || "N/A"}`);
};

// ==================== BACKUP FUNCTION ====================
const saveToBackup = async (userEmail, userName, mobileNumber, city, problem) => {
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

    const backupFile = path.join(logDir, "backup_submissions.json");
    let existingData = [];

    if (fs.existsSync(backupFile)) {
      existingData = JSON.parse(fs.readFileSync(backupFile, "utf8"));
    }

    existingData.push(backupData);
    fs.writeFileSync(backupFile, JSON.stringify(existingData, null, 2));
    return true;
  } catch (backupError) {
    console.error("Backup failed:", backupError.message);
    return false;
  }
};

// ==================== MAIN EMAIL FUNCTION ====================
const sendCareerEmail = async (userEmail, userName, mobileNumber, city, problem) => {
  const startTime = Date.now();
  const timestamp = new Date().toLocaleTimeString();

  console.log(`\n🚀 [${timestamp}] INSTANT EMAIL PROCESSING STARTED`);
  console.log(`   👤 ${userName || "Client"}`);
  console.log(`   📧 ${userEmail}`);
  console.log(`   📍 ${city || "Not specified"}`);

  try {
    // टेम्प्लेट तैयार करें
    const template = EMAIL_TEMPLATES.careerConfirmation(
      userName || "Client",
      mobileNumber || "Not provided",
      city || "Not specified",
      problem || "Career guidance query"
    );
    
    // Resend से ईमेल भेजें
    const { data, error } = await resend.emails.send({
      from: 'SS Admission <onboarding@resend.dev>',  // फ्री टियर के लिए
      to: [userEmail],
      cc: process.env.ADMIN_EMAIL ? [process.env.ADMIN_EMAIL] : [],
      subject: template.subject,
      html: template.html,
    });
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // अगर कोई error है तो दिखाएं
    if (error) {
      console.error(`❌ [${new Date().toLocaleTimeString()}] Email FAILED for ${userEmail} after ${duration}ms:`, error.message);
      
      // बैकअप में सेव करें
      await saveToBackup(userEmail, userName, mobileNumber, city, problem);
      
      // लॉग करें
      logEmailActivity("FAILED", {
        userEmail,
        userName,
        error: error.message,
        duration: `${duration}ms`,
      });
      
      return { 
        success: false, 
        error: error.message,
        fallbackUsed: true,
        duration: `${duration}ms`,
      };
    }
    
    // सफलता मिली
    console.log(`✅ [${new Date().toLocaleTimeString()}] Email SENT to ${userEmail} in ${duration}ms, ID: ${data?.id}`);
    
    // लॉग करें
    logEmailActivity("SENT", {
      userEmail,
      userName,
      messageId: data?.id,
      duration: `${duration}ms`,
    });
    
    return { 
      success: true, 
      immediate: true,
      messageId: data?.id,
      message: "Email sent successfully",
      duration: `${duration}ms`,
    };
    
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.error(`❌ [${new Date().toLocaleTimeString()}] Email FAILED for ${userEmail} after ${duration}ms:`, error.message);
    
    // बैकअप में सेव करें
    await saveToBackup(userEmail, userName, mobileNumber, city, problem);
    
    // लॉग करें
    logEmailActivity("FAILED", {
      userEmail,
      userName,
      error: error.message,
      duration: `${duration}ms`,
    });
    
    return { 
      success: false, 
      error: error.message,
      fallbackUsed: true,
      duration: `${duration}ms`,
    };
  }
};

// ==================== EXPORT ====================
module.exports = {
  sendCareerEmail,
};