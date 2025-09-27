import { body, validationResult } from 'express-validator';

// Validation rules for contact form submission
export const validateContactForm = [
    // Required fields validation
    body('fullName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s\-'\.]+$/)
        .withMessage('Full name contains invalid characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email is too long'),

    body('companyName')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Company name is required and must be less than 100 characters')
        .matches(/^[a-zA-Z0-9\s\-_&'"\.,\(\)]+$/)
        .withMessage('Company name contains invalid characters'),

    body('phoneNumber')
        .trim()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),

    body('industry')
        .isIn(['technology', 'finance', 'healthcare', 'manufacturing', 'retail', 'professional', 'real-estate', 'education', 'logistics', 'other'])
        .withMessage('Please select a valid industry'),

    body('companySize')
        .isIn(['startup', 'small', 'mid-market', 'enterprise', 'large-enterprise'])
        .withMessage('Please select a valid company size'),

    body('aiExperience')
        .isIn(['none', 'exploring', 'pilot', 'some', 'advanced'])
        .withMessage('Please select a valid AI experience level'),

    body('timeline')
        .isIn(['immediate', 'short', 'medium', 'long', 'not-sure'])
        .withMessage('Please select a valid timeline'),

    body('investmentRange')
        .isIn(['under-10k', '10k-25k', '25k-50k', '50k-100k', '100k-plus'])
        .withMessage('Please select a valid investment range'),

    // Optional fields validation
    body('primaryInterest')
        .optional()
        .isIn(['automation', 'customer-service', 'data-analysis', 'sales-marketing', 'operational', 'custom'])
        .withMessage('Please select a valid primary interest area'),

    body('businessChallenge')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('Business challenge description is too long (max 2000 characters)')
        .escape(),

    body('aiMotivation')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('AI motivation description is too long (max 2000 characters)')
        .escape(),

    // UTM and tracking parameters (optional)
    body('utmSource')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('UTM source is too long'),

    body('utmMedium')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('UTM medium is too long'),

    body('utmCampaign')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('UTM campaign is too long'),

    body('referrer')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Referrer is too long')
];

// Validation rules for analytics tracking
export const validateAnalyticsEvent = [
    body('eventType')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Event type is required and must be less than 50 characters')
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Event type contains invalid characters'),

    body('eventData')
        .optional()
        .isObject()
        .withMessage('Event data must be a valid object'),

    body('pageUrl')
        .optional()
        .isURL()
        .withMessage('Page URL must be a valid URL'),

    body('sessionId')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Session ID is too long')
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value
        }));

        console.log('❌ Validation errors:', errorMessages);

        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errorMessages
        });
    }

    next();
};

// Sanitize input data
export const sanitizeContactData = (data) => {
    const sanitized = {};

    // Required fields
    sanitized.fullName = data.fullName?.trim();
    sanitized.email = data.email?.toLowerCase().trim();
    sanitized.companyName = data.companyName?.trim();
    sanitized.phoneNumber = data.phoneNumber?.trim().replace(/\D/g, '').replace(/^(\d{1})/, '+$1');
    sanitized.industry = data.industry;
    sanitized.companySize = data.companySize;
    sanitized.aiExperience = data.aiExperience;
    sanitized.timeline = data.timeline;
    sanitized.investmentRange = data.investmentRange;

    // Optional fields
    sanitized.primaryInterest = data.primaryInterest || null;
    sanitized.businessChallenge = data.businessChallenge?.trim() || null;
    sanitized.aiMotivation = data.aiMotivation?.trim() || null;

    // UTM and tracking data
    sanitized.utmSource = data.utmSource?.trim() || null;
    sanitized.utmMedium = data.utmMedium?.trim() || null;
    sanitized.utmCampaign = data.utmCampaign?.trim() || null;
    sanitized.referrer = data.referrer?.trim() || null;

    return sanitized;
};

// IP address validation and sanitization
export const getClientIP = (req) => {
    return req.ip ||
           req.connection?.remoteAddress ||
           req.socket?.remoteAddress ||
           (req.connection?.socket ? req.connection.socket.remoteAddress : null) ||
           req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
           req.headers['x-real-ip'] ||
           'unknown';
};

// User agent sanitization
export const sanitizeUserAgent = (userAgent) => {
    if (!userAgent) return null;

    // Remove potentially dangerous characters and limit length
    return userAgent.substring(0, 500).replace(/[<>]/g, '');
};

// Honeypot validation (simple spam protection)
export const validateHoneypot = (req, res, next) => {
    // Check for honeypot field (should be empty)
    if (req.body.website || req.body.url || req.body.homepage) {
        console.log('🍯 Honeypot triggered - potential spam detected');
        return res.status(400).json({
            success: false,
            error: 'Invalid submission'
        });
    }

    next();
};

// Rate limiting check for additional protection
export const checkSubmissionFrequency = async (req, res, next) => {
    const clientIP = getClientIP(req);
    const email = req.body.email;

    // This would ideally check against database for recent submissions
    // For now, we rely on express-rate-limit middleware
    // Future enhancement: implement database-based frequency checking

    next();
};