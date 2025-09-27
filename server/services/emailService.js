import nodemailer from 'nodemailer';
import { Resend } from 'resend';

class EmailService {
    constructor() {
        this.transporter = null;
        this.resend = null;
        this.emailProvider = process.env.EMAIL_SERVICE || 'gmail';
        this.init();
    }

    init() {
        try {
            if (this.emailProvider === 'resend') {
                // Initialize Resend
                if (process.env.RESEND_API_KEY) {
                    this.resend = new Resend(process.env.RESEND_API_KEY);
                    console.log('✅ Resend email service initialized');
                } else {
                    console.warn('⚠️ RESEND_API_KEY not provided');
                }
            } else {
                // Create nodemailer transporter with explicit SMTP settings
                const emailConfig = {
                    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                    port: parseInt(process.env.EMAIL_PORT) || 587,
                    secure: process.env.EMAIL_SECURE === 'true' || false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    },
                    tls: {
                        rejectUnauthorized: false
                    },
                    connectionTimeout: 60000, // 60 seconds
                    greetingTimeout: 30000,   // 30 seconds
                    socketTimeout: 60000      // 60 seconds
                };

                // If using Gmail service shorthand
                if (process.env.EMAIL_SERVICE === 'gmail') {
                    emailConfig.service = 'gmail';
                    delete emailConfig.host;
                    delete emailConfig.port;
                }

                this.transporter = nodemailer.createTransport(emailConfig);

                // Verify connection configuration
                this.transporter.verify((error, success) => {
                    if (error) {
                        console.warn('⚠️ Email service verification failed:', error.message);
                        console.log('Email notifications will be disabled until configured properly');
                    } else {
                        console.log('✅ Email service ready');
                    }
                });
            }
        } catch (error) {
            console.error('Email service initialization error:', error);
        }
    }

    async sendLeadNotification(leadData) {
        if (this.emailProvider === 'resend') {
            return this.sendResendEmail(leadData, 'notification');
        } else {
            if (!this.transporter) {
                console.warn('Email service not configured');
                return { success: false, error: 'Email service not configured' };
            }

            try {
                const subject = `🚀 New Lead: ${leadData.fullName} from ${leadData.companyName}`;
                const htmlBody = this.generateLeadNotificationHTML(leadData);
                const textBody = this.generateLeadNotificationText(leadData);

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_TO || 'hello@etheriusai.com',
                    subject: subject,
                    text: textBody,
                    html: htmlBody
                };

                const result = await this.transporter.sendMail(mailOptions);
                console.log('✅ Lead notification sent:', result.messageId);

                return { success: true, messageId: result.messageId };
            } catch (error) {
                console.error('❌ Failed to send lead notification:', error.message);
                return { success: false, error: error.message };
            }
        }
    }

    async sendAutoReply(leadData) {
        if (this.emailProvider === 'resend') {
            return this.sendResendEmail(leadData, 'reply');
        } else {
            if (!this.transporter) {
                console.warn('Email service not configured');
                return { success: false, error: 'Email service not configured' };
            }

            try {
                const subject = `Thank you for your interest in Etherius AI, ${leadData.fullName}!`;
                const htmlBody = this.generateAutoReplyHTML(leadData);
                const textBody = this.generateAutoReplyText(leadData);

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: leadData.email,
                    subject: subject,
                    text: textBody,
                    html: htmlBody
                };

                const result = await this.transporter.sendMail(mailOptions);
                console.log('✅ Auto-reply sent to:', leadData.email);

                return { success: true, messageId: result.messageId };
            } catch (error) {
                console.error('❌ Failed to send auto-reply:', error.message);
                return { success: false, error: error.message };
            }
        }
    }

    async sendResendEmail(leadData, type) {
        if (!this.resend) {
            console.warn('Resend not configured');
            return { success: false, error: 'Resend not configured' };
        }

        try {
            let emailData;
            const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

            if (type === 'notification') {
                emailData = {
                    from: fromEmail,
                    to: process.env.EMAIL_TO || 'etheriusai@gmail.com',
                    subject: `🚀 New Lead: ${leadData.fullName} from ${leadData.companyName}`,
                    html: this.generateLeadNotificationHTML(leadData),
                    text: this.generateLeadNotificationText(leadData)
                };
            } else if (type === 'reply') {
                emailData = {
                    from: fromEmail,
                    to: leadData.email,
                    subject: `Thank you for your interest in Etherius AI, ${leadData.fullName}!`,
                    html: this.generateAutoReplyHTML(leadData),
                    text: this.generateAutoReplyText(leadData)
                };
            }

            const result = await this.resend.emails.send(emailData);
            console.log(`✅ Resend ${type} email sent:`, result.id);

            return { success: true, messageId: result.id, id: result.id };
        } catch (error) {
            console.error(`❌ Failed to send ${type} email via Resend:`, error.message);
            return { success: false, error: error.message };
        }
    }

    generateLeadNotificationHTML(leadData) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Lead Notification</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0F172A; color: #CEFC55; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; }
                .footer { background: #0F172A; color: #fff; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
                .info-item { background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #CEFC55; }
                .label { font-weight: bold; color: #0F172A; }
                .priority-high { border-left-color: #ef4444; }
                .priority-medium { border-left-color: #f59e0b; }
                .priority-low { border-left-color: #10b981; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚀 New Lead Alert</h1>
                    <p>A new potential client has submitted an inquiry</p>
                </div>

                <div class="content">
                    <h2>Contact Information</h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="label">Name:</div>
                            <div>${leadData.fullName}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Email:</div>
                            <div><a href="mailto:${leadData.email}">${leadData.email}</a></div>
                        </div>
                        <div class="info-item">
                            <div class="label">Phone:</div>
                            <div><a href="tel:${leadData.phoneNumber}">${leadData.phoneNumber}</a></div>
                        </div>
                        <div class="info-item">
                            <div class="label">Company:</div>
                            <div>${leadData.companyName}</div>
                        </div>
                    </div>

                    <h2>Business Details</h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="label">Industry:</div>
                            <div>${leadData.industry}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Company Size:</div>
                            <div>${leadData.companySize}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">AI Experience:</div>
                            <div>${leadData.aiExperience}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Timeline:</div>
                            <div>${leadData.timeline}</div>
                        </div>
                    </div>

                    <h2>Project Information</h2>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="label">Investment Range:</div>
                            <div>${leadData.investmentRange}</div>
                        </div>
                        <div class="info-item">
                            <div class="label">Primary Interest:</div>
                            <div>${leadData.primaryInterest || 'Not specified'}</div>
                        </div>
                    </div>

                    ${leadData.businessChallenge ? `
                    <h2>Business Challenge</h2>
                    <div class="info-item">
                        <p>${leadData.businessChallenge}</p>
                    </div>
                    ` : ''}

                    ${leadData.aiMotivation ? `
                    <h2>AI Motivation</h2>
                    <div class="info-item">
                        <p>${leadData.aiMotivation}</p>
                    </div>
                    ` : ''}

                    <h2>Lead Priority Recommendation</h2>
                    <div class="info-item priority-${this.calculateLeadPriority(leadData)}">
                        <div class="label">Priority Level:</div>
                        <div>${this.calculateLeadPriority(leadData).toUpperCase()}</div>
                    </div>
                </div>

                <div class="footer">
                    <p>Follow up within 24 hours for best conversion rates</p>
                    <p>Lead submitted at: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    generateLeadNotificationText(leadData) {
        return `
NEW LEAD ALERT - Etherius AI

Contact Information:
Name: ${leadData.fullName}
Email: ${leadData.email}
Phone: ${leadData.phoneNumber}
Company: ${leadData.companyName}

Business Details:
Industry: ${leadData.industry}
Company Size: ${leadData.companySize}
AI Experience: ${leadData.aiExperience}
Timeline: ${leadData.timeline}
Investment Range: ${leadData.investmentRange}

${leadData.primaryInterest ? `Primary Interest: ${leadData.primaryInterest}` : ''}

${leadData.businessChallenge ? `Business Challenge:\n${leadData.businessChallenge}` : ''}

${leadData.aiMotivation ? `AI Motivation:\n${leadData.aiMotivation}` : ''}

Priority Level: ${this.calculateLeadPriority(leadData).toUpperCase()}

Submitted: ${new Date().toLocaleString()}
        `;
    }

    generateAutoReplyHTML(leadData) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank you for your interest in Etherius AI</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0F172A; color: #CEFC55; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; }
                .footer { background: #0F172A; color: #fff; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
                .highlight { color: #CEFC55; font-weight: bold; }
                .cta-button { display: inline-block; background: #CEFC55; color: #0F172A; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You, ${leadData.fullName}!</h1>
                    <p>Your AI transformation journey starts here</p>
                </div>

                <div class="content">
                    <p>Thank you for your interest in Etherius AI! We're excited to help ${leadData.companyName} unlock the power of AI.</p>

                    <h2>What happens next?</h2>
                    <ul>
                        <li><strong>Within 24 hours:</strong> Our AI strategy expert will review your submission and reach out personally</li>
                        <li><strong>Discovery Call:</strong> We'll discuss your specific needs and goals (typically 30-45 minutes)</li>
                        <li><strong>Custom Proposal:</strong> Based on our conversation, we'll create a tailored AI implementation roadmap</li>
                    </ul>

                    <h2>Your submission summary:</h2>
                    <p><strong>Company:</strong> ${leadData.companyName}</p>
                    <p><strong>Industry:</strong> ${leadData.industry}</p>
                    <p><strong>Timeline:</strong> ${leadData.timeline}</p>
                    <p><strong>Investment Range:</strong> ${leadData.investmentRange}</p>

                    <p>In the meantime, feel free to explore our case studies and AI success stories at <a href="https://etheriusai.com">etheriusai.com</a></p>

                    <p>Have an urgent question? Reply to this email or call us directly.</p>

                    <p>Best regards,<br>
                    <strong>The Etherius AI Team</strong></p>
                </div>

                <div class="footer">
                    <p>Etherius AI - Transforming AI potential into measurable business results</p>
                    <p>Email: hello@etheriusai.com | Website: etheriusai.com</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    generateAutoReplyText(leadData) {
        return `
Thank you for your interest in Etherius AI, ${leadData.fullName}!

We're excited to help ${leadData.companyName} unlock the power of AI.

What happens next?
- Within 24 hours: Our AI strategy expert will review your submission and reach out personally
- Discovery Call: We'll discuss your specific needs and goals (typically 30-45 minutes)
- Custom Proposal: Based on our conversation, we'll create a tailored AI implementation roadmap

Your submission summary:
Company: ${leadData.companyName}
Industry: ${leadData.industry}
Timeline: ${leadData.timeline}
Investment Range: ${leadData.investmentRange}

In the meantime, feel free to explore our case studies and AI success stories at etheriusai.com

Have an urgent question? Reply to this email or call us directly.

Best regards,
The Etherius AI Team

---
Etherius AI - Transforming AI potential into measurable business results
Email: hello@etheriusai.com | Website: etheriusai.com
        `;
    }

    calculateLeadPriority(leadData) {
        let score = 0;

        // Investment range scoring
        const investmentScores = {
            'under-10k': 1,
            '10k-25k': 2,
            '25k-50k': 3,
            '50k-100k': 4,
            '100k-plus': 5
        };
        score += investmentScores[leadData.investmentRange] || 0;

        // Timeline scoring (faster timeline = higher priority)
        const timelineScores = {
            'immediate': 5,
            'short': 4,
            'medium': 3,
            'long': 2,
            'not-sure': 1
        };
        score += timelineScores[leadData.timeline] || 0;

        // Company size scoring
        const companySizeScores = {
            'startup': 2,
            'small': 3,
            'mid-market': 4,
            'enterprise': 5,
            'large-enterprise': 5
        };
        score += companySizeScores[leadData.companySize] || 0;

        // AI experience scoring (less experience = potentially easier conversion)
        const aiExperienceScores = {
            'none': 4,
            'exploring': 5,
            'pilot': 4,
            'some': 3,
            'advanced': 2
        };
        score += aiExperienceScores[leadData.aiExperience] || 0;

        // Determine priority based on total score
        if (score >= 15) return 'high';
        if (score >= 10) return 'medium';
        return 'low';
    }
}

export default EmailService;