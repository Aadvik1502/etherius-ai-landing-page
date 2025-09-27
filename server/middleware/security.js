import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting configuration
export const createRateLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs: windowMs || parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes default
        max: max || parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10, // limit each IP to max requests per windowMs
        message: message || {
            success: false,
            error: 'Too many requests from this IP, please try again later.',
            retryAfter: Math.ceil(windowMs / 1000 / 60) // minutes
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        skip: (req) => {
            // Skip rate limiting for health checks
            return req.path === '/health' || req.path === '/api/health';
        },
        handler: (req, res) => {
            console.log(`🚫 Rate limit exceeded for IP: ${req.ip}`);
            res.status(429).json(message || {
                success: false,
                error: 'Too many requests from this IP, please try again later.'
            });
        }
    });
};

// Contact form specific rate limiter (more restrictive)
export const contactFormLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    3, // max 3 submissions per 15 minutes
    {
        success: false,
        error: 'Too many form submissions. Please wait 15 minutes before submitting again.',
        retryAfter: 15
    }
);

// General API rate limiter
export const apiLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    100, // max 100 requests per 15 minutes
    {
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: 15
    }
);

// Analytics rate limiter (more lenient)
export const analyticsLimiter = createRateLimiter(
    5 * 60 * 1000, // 5 minutes
    50, // max 50 analytics events per 5 minutes
    {
        success: false,
        error: 'Analytics rate limit exceeded.',
        retryAfter: 5
    }
);

// Security headers configuration
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameAncestors: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"]
        },
    },
    crossOriginEmbedderPolicy: false, // Disable for better compatibility
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
});

// CORS configuration
export const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            process.env.FRONTEND_URL || 'http://localhost:8080',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:8000', // For local analytics dashboard
            'http://localhost:8081', // Vite dev server port
            'https://etheriusai.com',
            'https://www.etheriusai.com',
            'https://etheriusai.co', // Current domain
            'https://www.etheriusai.co' // Current domain with www
        ];

        // Add production domains from environment
        if (process.env.ALLOWED_ORIGINS) {
            allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(`🚫 CORS blocked request from origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Request logging middleware
export const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;
    const userAgent = req.get('User-Agent');

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - UA: ${userAgent?.substring(0, 100) || 'Unknown'}`);

    // Log response time
    const startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const status = res.statusCode;
        console.log(`[${timestamp}] ${method} ${url} - ${status} - ${duration}ms`);
    });

    next();
};

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error('❌ Error occurred:', err.stack);

    // Rate limiting error
    if (err.status === 429) {
        return res.status(429).json({
            success: false,
            error: 'Rate limit exceeded',
            retryAfter: err.retryAfter
        });
    }

    // CORS error
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            error: 'Access denied - invalid origin'
        });
    }

    // Validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid input data',
            details: err.details
        });
    }

    // Database error
    if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({
            success: false,
            error: 'Database constraint violation'
        });
    }

    // Generic server error
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
};

// Health check middleware
export const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
};

// Input sanitization middleware
export const sanitizeInput = (req, res, next) => {
    // Sanitize common dangerous characters
    const sanitizeString = (str) => {
        if (typeof str !== 'string') return str;
        return str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
            .trim();
    };

    // Recursively sanitize object
    const sanitizeObject = (obj) => {
        if (typeof obj === 'string') {
            return sanitizeString(obj);
        } else if (Array.isArray(obj)) {
            return obj.map(sanitizeObject);
        } else if (obj && typeof obj === 'object') {
            const sanitized = {};
            for (const key in obj) {
                sanitized[key] = sanitizeObject(obj[key]);
            }
            return sanitized;
        }
        return obj;
    };

    // Sanitize request body
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }

    // Sanitize query parameters
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }

    next();
};