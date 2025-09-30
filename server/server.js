import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Import services and middleware
import Database from './database/database.js';
import EmailService from './services/emailService.js';
import {
    validateContactForm,
    validateAnalyticsEvent,
    handleValidationErrors,
    sanitizeContactData,
    getClientIP,
    sanitizeUserAgent,
    validateHoneypot,
    checkSubmissionFrequency
} from './middleware/validation.js';
import {
    contactFormLimiter,
    apiLimiter,
    analyticsLimiter,
    securityHeaders,
    corsOptions,
    requestLogger,
    errorHandler,
    healthCheck,
    sanitizeInput
} from './middleware/security.js';

// Load environment variables
dotenv.config();

// Initialize services
const app = express();
const PORT = process.env.PORT || 3001;
const database = new Database();
const emailService = new EmailService();

// Trust proxy for accurate IP addresses (important for rate limiting)
app.set('trust proxy', 1);

// Apply security headers
app.use(securityHeaders);

// Enable CORS
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Input sanitization
app.use(sanitizeInput);

// Apply general rate limiting
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

// API Routes

// Contact form submission endpoint
app.post('/api/contact',
    contactFormLimiter,
    validateHoneypot,
    validateContactForm,
    handleValidationErrors,
    checkSubmissionFrequency,
    async (req, res) => {
        try {
            console.log('📝 Processing contact form submission...');

            // Sanitize and prepare lead data
            const sanitizedData = sanitizeContactData(req.body);
            const clientIP = getClientIP(req);
            const userAgent = sanitizeUserAgent(req.get('User-Agent'));

            const leadData = {
                uuid: uuidv4(),
                ...sanitizedData,
                ipAddress: clientIP,
                userAgent: userAgent,
                referrer: req.get('Referer') || sanitizedData.referrer
            };

            // Save to database
            console.log('💾 Saving lead to database...');
            const result = await database.createLead(leadData);

            // Send email notifications
            console.log('📧 Sending email notifications...');
            const emailPromises = [];

            // Send notification to business
            emailPromises.push(
                emailService.sendLeadNotification(leadData)
                    .then(result => database.logEmail(result.id, process.env.EMAIL_TO, 'New Lead Notification', 'Lead notification email', result.success ? 'sent' : 'failed', result.error))
                    .catch(error => {
                        console.error('Failed to send business notification:', error);
                        return database.logEmail(result.id, process.env.EMAIL_TO, 'New Lead Notification', 'Lead notification email', 'failed', error.message);
                    })
            );

            // Send auto-reply to customer
            emailPromises.push(
                emailService.sendAutoReply(leadData)
                    .then(result => {
                        if (result.success) {
                            database.markLeadEmailed(result.id);
                        }
                        return database.logEmail(result.id, leadData.email, 'Thank you for your interest', 'Auto-reply email', result.success ? 'sent' : 'failed', result.error);
                    })
                    .catch(error => {
                        console.error('Failed to send auto-reply:', error);
                        return database.logEmail(result.id, leadData.email, 'Thank you for your interest', 'Auto-reply email', 'failed', error.message);
                    })
            );

            // Execute email sends (don't wait for completion to improve response time)
            Promise.all(emailPromises)
                .then(() => console.log('✅ All email notifications processed'))
                .catch(error => console.error('❌ Some email notifications failed:', error));

            // Track analytics event
            await database.trackEvent('contact_form_submission', {
                leadId: result.id,
                companySize: leadData.companySize,
                industry: leadData.industry,
                investmentRange: leadData.investmentRange,
                timeline: leadData.timeline
            }, {
                ipAddress: clientIP,
                userAgent: userAgent,
                referrer: req.get('Referer'),
                pageUrl: req.body.pageUrl
            });

            // Respond to client
            res.status(201).json({
                success: true,
                message: 'Thank you for your submission! We will get back to you within 24 hours.',
                leadId: result.uuid,
                timestamp: new Date().toISOString()
            });

            console.log(`✅ Contact form submission completed successfully for ${leadData.email}`);

        } catch (error) {
            console.error('❌ Contact form submission error:', error);

            // Track error event
            try {
                await database.trackEvent('contact_form_error', {
                    error: error.message,
                    stack: error.stack
                }, {
                    ipAddress: getClientIP(req),
                    userAgent: sanitizeUserAgent(req.get('User-Agent'))
                });
            } catch (trackingError) {
                console.error('Failed to track error event:', trackingError);
            }

            res.status(500).json({
                success: false,
                error: 'Failed to process your submission. Please try again or contact us directly.',
                timestamp: new Date().toISOString()
            });
        }
    }
);

// Analytics tracking endpoint
app.post('/api/analytics',
    analyticsLimiter,
    validateAnalyticsEvent,
    handleValidationErrors,
    async (req, res) => {
        try {
            const { eventType, eventData, pageUrl, sessionId } = req.body;
            const clientIP = getClientIP(req);
            const userAgent = sanitizeUserAgent(req.get('User-Agent'));

            await database.trackEvent(eventType, eventData, {
                ipAddress: clientIP,
                userAgent: userAgent,
                referrer: req.get('Referer'),
                pageUrl: pageUrl,
                sessionId: sessionId
            });

            res.status(200).json({
                success: true,
                message: 'Event tracked successfully'
            });

        } catch (error) {
            console.error('❌ Analytics tracking error:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to track event'
            });
        }
    }
);

// Lead management endpoints (for future admin dashboard)

// Get all leads (protected - would need authentication in production)
app.get('/api/admin/leads',
    async (req, res) => {
        try {
            // TODO: Add authentication middleware
            const { limit = 50, offset = 0, status, priority } = req.query;

            const leads = await database.getAllLeads(parseInt(limit), parseInt(offset));

            res.status(200).json({
                success: true,
                data: leads,
                count: leads.length,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Failed to fetch leads:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch leads'
            });
        }
    }
);

// Update lead status (protected - would need authentication in production)
app.put('/api/admin/leads/:id/status',
    async (req, res) => {
        try {
            // TODO: Add authentication middleware
            const { id } = req.params;
            const { status, notes } = req.body;

            const result = await database.updateLeadStatus(id, status, notes);

            if (result.changes === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Lead not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Lead status updated successfully',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Failed to update lead status:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update lead status'
            });
        }
    }
);

// Get analytics data (protected - would need authentication in production)
app.get('/api/admin/analytics',
    async (req, res) => {
        try {
            // TODO: Add authentication middleware
            const { eventType, startDate, endDate } = req.query;

            const analytics = await database.getAnalytics(eventType, startDate, endDate);

            res.status(200).json({
                success: true,
                data: analytics,
                count: analytics.length,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Failed to fetch analytics:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch analytics'
            });
        }
    }
);

// Admin authentication endpoint
app.post('/api/admin/login',
    async (req, res) => {
        try {
            const { password } = req.body;
            const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Default for development

            if (password === adminPassword) {
                res.status(200).json({
                    success: true,
                    message: 'Authentication successful'
                });
            } else {
                res.status(401).json({
                    success: false,
                    error: 'Invalid password'
                });
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            res.status(500).json({
                success: false,
                error: 'Login failed'
            });
        }
    }
);

// Test email endpoint (for development/testing)
if (process.env.NODE_ENV === 'development') {
    app.post('/api/test/email',
        async (req, res) => {
            try {
                const testLead = {
                    fullName: 'Test User',
                    email: 'test@example.com',
                    companyName: 'Test Company',
                    phoneNumber: '+1234567890',
                    industry: 'technology',
                    companySize: 'startup',
                    aiExperience: 'exploring',
                    timeline: 'immediate',
                    investmentRange: '25k-50k',
                    businessChallenge: 'Testing email functionality',
                    aiMotivation: 'Development testing'
                };

                const result = await emailService.sendLeadNotification(testLead);

                res.status(200).json({
                    success: true,
                    message: 'Test email sent',
                    result: result
                });

            } catch (error) {
                console.error('❌ Test email failed:', error);
                res.status(500).json({
                    success: false,
                    error: 'Test email failed',
                    details: error.message
                });
            }
        }
    );
}

// Catch-all for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        availableEndpoints: [
            'POST /api/contact',
            'POST /api/analytics',
            'GET /api/health',
            'GET /api/admin/leads',
            'PUT /api/admin/leads/:id/status',
            'GET /api/admin/analytics'
        ]
    });
});

// Global error handler
app.use(errorHandler);

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT. Graceful shutdown...');
    database.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM. Graceful shutdown...');
    database.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Etherius AI Backend Server`);
    console.log(`📍 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔧 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 API base URL: http://localhost:${PORT}/api`);

    if (process.env.NODE_ENV === 'development') {
        console.log(`🧪 Test email endpoint: http://localhost:${PORT}/api/test/email`);
    }

    console.log(`\n📝 Available endpoints:`);
    console.log(`   POST /api/contact - Submit contact form`);
    console.log(`   POST /api/analytics - Track analytics events`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   GET  /api/admin/leads - Get all leads`);
    console.log(`   PUT  /api/admin/leads/:id/status - Update lead status`);
    console.log(`   GET  /api/admin/analytics - Get analytics data`);
    console.log(`\n✅ Server ready for connections!`);
});

export default app;