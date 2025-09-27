# Etherius AI Backend Setup Guide

This guide will help you set up and configure the complete backend system for the Etherius AI website.

## 🚀 Quick Start

### 1. Environment Setup

#### Backend Environment (`.env` in `/server` directory)
```bash
# Copy the example file
cd server
cp .env.example .env

# Edit the .env file with your settings
nano .env
```

**Required Configuration:**
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DB_PATH=./database/leads.db

# Email Configuration (REQUIRED for lead notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=hello@etheriusai.com

# Security
JWT_SECRET=your-random-secret-key-here
ADMIN_PASSWORD=your-secure-admin-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

#### Frontend Environment (`.env` in root directory)
```bash
# Copy the example file
cp .env.example .env

# Edit with your settings
VITE_API_URL=http://localhost:3001/api
VITE_NODE_ENV=development
VITE_DEBUG_MODE=true
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Start the System

#### Option A: Run Both Frontend and Backend Together
```bash
npm run dev:full
```

#### Option B: Run Separately
```bash
# Terminal 1 - Backend
npm run server:dev

# Terminal 2 - Frontend
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health

## 📧 Email Configuration

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Create an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

3. **Configure Environment:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-business@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_TO=hello@etheriusai.com
```

### Other Email Providers
The system supports any SMTP provider. Update these settings:
```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
```

## 🗄️ Database Information

The system uses SQLite for simplicity and ease of deployment:

- **Location:** `server/database/leads.db`
- **Schema:** Automatically created on first run
- **Backup:** Simply copy the `.db` file

### Database Features
- **Leads Management:** Complete contact form submissions
- **Analytics Tracking:** User behavior and conversion metrics
- **Email Logs:** Track all sent emails and delivery status
- **Admin Users:** Future dashboard access (placeholder)

## 🔒 Security Features

### Implemented Security Measures
- **Rate Limiting:** Prevents spam and abuse
- **Input Validation:** Server-side validation of all inputs
- **SQL Injection Protection:** Parameterized queries
- **XSS Protection:** Input sanitization
- **CORS Protection:** Configured allowed origins
- **Helmet Security Headers:** Standard security headers
- **Honeypot Spam Protection:** Hidden form fields

### Rate Limits
- **Contact Form:** 3 submissions per 15 minutes per IP
- **General API:** 100 requests per 15 minutes per IP
- **Analytics:** 50 events per 5 minutes per IP

## 📊 Analytics Tracking

### Automatic Tracking
- **Page Views:** Tracked on every page load
- **Scroll Depth:** 25%, 50%, 75%, 90%, 100% milestones
- **Time on Page:** Tracked when user leaves
- **Form Interactions:** Start, field focus/blur, submissions
- **CTA Clicks:** All button and link interactions

### Manual Tracking
Use the API service in your components:
```javascript
import apiService from '@/services/apiService';

// Track custom events
await apiService.trackEvent('button_click', {
  buttonText: 'Get Started',
  location: 'hero_section'
});
```

## 🧪 Testing the System

### 1. Health Check
```bash
curl http://localhost:3001/health
```

### 2. Contact Form Test
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "companyName": "Test Company",
    "phoneNumber": "+1234567890",
    "industry": "technology",
    "companySize": "startup",
    "aiExperience": "exploring",
    "timeline": "immediate",
    "investmentRange": "25k-50k"
  }'
```

### 3. Analytics Test
```bash
curl -X POST http://localhost:3001/api/analytics \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "test_event",
    "eventData": {"test": true}
  }'
```

### 4. Email Test (Development Only)
```bash
curl -X POST http://localhost:3001/api/test/email
```

## 📋 API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/analytics` - Track analytics events
- `GET /api/health` - Health check

### Admin Endpoints (Future Dashboard)
- `GET /api/admin/leads` - Get all leads
- `PUT /api/admin/leads/:id/status` - Update lead status
- `GET /api/admin/analytics` - Get analytics data

## 🚨 Troubleshooting

### Common Issues

#### 1. "Failed to fetch" Error
- **Cause:** Backend not running or wrong URL
- **Solution:** Ensure backend is running on port 3001
- **Check:** `curl http://localhost:3001/health`

#### 2. Email Not Sending
- **Cause:** Invalid email configuration
- **Solution:** Check Gmail app password and credentials
- **Test:** Use the `/api/test/email` endpoint in development

#### 3. CORS Errors
- **Cause:** Frontend URL not in CORS whitelist
- **Solution:** Update `FRONTEND_URL` in server `.env`

#### 4. Rate Limiting Issues
- **Cause:** Too many requests from same IP
- **Solution:** Wait for rate limit window to reset or adjust limits

#### 5. Database Errors
- **Cause:** Database file permissions or corruption
- **Solution:** Check file permissions or delete `.db` file to recreate

### Debug Mode
Enable detailed logging:
```env
# Backend
NODE_ENV=development

# Frontend
VITE_DEBUG_MODE=true
```

## 🔧 Customization

### Adjusting Rate Limits
Edit `server/.env`:
```env
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes in milliseconds
RATE_LIMIT_MAX_REQUESTS=10   # Max requests per window
```

### Custom Email Templates
Edit `server/services/emailService.js`:
- `generateLeadNotificationHTML()` - Business notification email
- `generateAutoReplyHTML()` - Customer auto-reply email

### Adding Fields to Contact Form
1. Update validation in `server/middleware/validation.js`
2. Update database schema in `server/database/schema.sql`
3. Update frontend form in `src/components/sections/ContactSection.tsx`

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
DB_PATH=/path/to/production/database/leads.db
EMAIL_TO=your-business-email@domain.com
```

### Security Considerations
- Change all default passwords
- Use environment-specific secrets
- Enable HTTPS
- Regular database backups
- Monitor rate limits and adjust as needed

### Hosting Recommendations
- **Backend:** Railway, Render, DigitalOcean, AWS
- **Database:** Included SQLite works for most use cases
- **Frontend:** Vercel, Netlify, Cloudflare Pages

## 📞 Support

If you encounter issues:

1. **Check Logs:** Both frontend console and backend terminal
2. **Verify Configuration:** Double-check all environment variables
3. **Test Components:** Use the provided curl commands
4. **Review Documentation:** This guide covers most scenarios

## 🎯 Next Steps

After basic setup is working:

1. **Configure Email:** Set up business email for lead notifications
2. **Test Form Submission:** Submit a test lead and verify email delivery
3. **Monitor Analytics:** Check that user interactions are being tracked
4. **Customize Content:** Update email templates and form fields as needed
5. **Plan Dashboard:** Consider building an admin dashboard for lead management

---

**🎉 Congratulations!** Your Etherius AI website now has a complete backend system with lead capture, email notifications, analytics tracking, and security measures.