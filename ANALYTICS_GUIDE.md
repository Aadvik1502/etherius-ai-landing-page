# Etherius AI Analytics Guide

## Simple Guide to Using Your Analytics System

Your website now has a **complete, maintenance-free analytics system** that captures everything you need to know about your visitors and leads. Here's how to use it.

---

## 📊 Your Admin Dashboard

**URL:** `http://localhost:8081/admin/dashboard` (development)
**URL:** `https://yourdomain.com/admin/dashboard` (production)

### How to Access
1. Go to `/admin/login`
2. Enter your admin password (set in server `.env` as `ADMIN_PASSWORD`)
3. Click "Dashboard" or navigate to `/admin/dashboard`

---

## 🎯 What You'll See in the Dashboard

### Top Metrics (4 Cards)
1. **Total Visitors** - Number of unique people who visited your site
2. **Leads Generated** - How many people filled out your contact form
3. **CTA Clicks** - How many times people clicked your call-to-action buttons
4. **Avg Time on Page** - How long visitors stay on your site (in seconds)

### Event Distribution Chart
- Shows what actions people are taking on your site
- Bigger slices = more of that activity
- Common events: `page_view`, `section_view`, `cta_click`, `scroll_depth`, `contact_form_submission`

### Recent Activity Feed
- Live stream of what's happening on your site
- Shows the last 10 user actions in real-time
- Refresh the page to see new activity

### Recent Leads Table
- **Most Important Section** - All your contact form submissions
- Shows up to 20 most recent leads
- Information includes:
  - Name & Email (to contact them)
  - Company & Industry
  - Company Size
  - Investment Range (how much they're willing to spend)
  - Date submitted
- **Export Button** - Download all leads as JSON file

### Bottom Metrics (3 Cards)
- **Page Views** - Total number of pages viewed
- **Section Views** - How many times sections were viewed (hero, services, etc.)
- **Total Events** - All tracked interactions combined

---

## 📈 Google Analytics 4 (GA4)

Your site also sends data to Google Analytics for deeper insights.

### How to Access GA4
1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Log in with your Google account
3. Select your property (Measurement ID: `G-4WN9EBGN6K`)

### 3 Key Reports to Check Weekly

#### 1. **Realtime Report**
- **Where:** Sidebar → Reports → Realtime
- **Shows:** Who's on your site right now
- **Why it matters:** See if marketing campaigns are driving traffic

#### 2. **Acquisition Overview**
- **Where:** Sidebar → Reports → Acquisition → Overview
- **Shows:** Where visitors come from (Google, social media, direct, etc.)
- **Why it matters:** Know which marketing channels work best

#### 3. **Conversions**
- **Where:** Sidebar → Reports → Engagement → Conversions
- **Shows:** Your `generate_lead` events (contact form submissions)
- **Why it matters:** Track your lead generation over time

---

## 🔍 What Data is Being Tracked?

### Automatically Tracked (No Action Required)

✅ **Every Page View** - When someone visits any page
✅ **Scroll Depth** - How far down the page people scroll (25%, 50%, 75%, 90%, 100%)
✅ **Time on Site** - How long visitors stay
✅ **Section Views** - When key sections become visible (Hero, Services, Contact, etc.)
✅ **CTA Clicks** - When someone clicks "Unlock Your AI Advantage" or other CTAs
✅ **Form Submissions** - Complete lead data from contact form
✅ **Click Heatmaps** - Where on the page people click

### Lead Data Captured
When someone submits the contact form, you get:
- Full Name, Email, Phone Number
- Company Name, Industry, Company Size
- AI Experience Level
- Primary Interest Area
- Business Challenge (text)
- AI Motivation (text)
- Timeline & Investment Range
- IP Address, User Agent, Referrer URL
- Timestamp

---

## 💼 Your Weekly Workflow

### Monday Morning Routine (5 minutes)
1. Open `/admin/dashboard`
2. Check "Leads Generated" metric
3. Review the "Recent Leads" table
4. Click "Export" to download leads for follow-up
5. Contact new leads via email or phone

### Optional: Monthly Traffic Check (5 minutes)
1. Open Google Analytics
2. Go to Acquisition Overview
3. See which channels bring the most visitors
4. Adjust marketing strategy accordingly

**That's it!** The system runs itself.

---

## 🛠️ Common Questions

### Where is my data stored?
- **Lead data:** SQLite database on your server (`/server/database/leads.db`)
- **Analytics events:** Same SQLite database
- **GA4 data:** Google's servers (accessible via analytics.google.com)

### How often should I check the dashboard?
- **Leads:** Weekly (or daily if running active campaigns)
- **Analytics:** Monthly (unless troubleshooting something)

### Can I export my data?
- **Yes!** Click the "Export" button in the dashboard
- Downloads a JSON file with all leads or analytics events
- Open in Excel, Google Sheets, or any data tool

### What if the dashboard doesn't load?
1. Check that your backend server is running (`npm run server:dev`)
2. Check the console for errors
3. Verify your API_URL in `.env` is correct
4. Contact support if issues persist

### How do I share the dashboard with my team?
- Share the dashboard URL and admin password
- Keep the password secure (only share with trusted team members)
- Consider implementing more robust authentication for production

---

## 📊 Understanding Your Metrics

### Good Benchmarks
- **Conversion Rate:** 2-5% is good for B2B (yours is shown on dashboard)
- **Avg Time on Page:** 60+ seconds means people are engaged
- **Scroll Depth:** 75%+ means your content is compelling
- **CTA Clicks:** Higher is better - test different copy to optimize

### Red Flags to Watch
⚠️ **High visitors, low leads** → Contact form might be intimidating, consider simplifying
⚠️ **Low scroll depth** → Content above the fold isn't engaging
⚠️ **Low time on page** → Visitors not finding what they need
⚠️ **No traffic from specific channels** → Marketing needs adjustment

---

## 🚀 Advanced: Custom Analytics

Want to track something specific? Your system supports custom events.

### Example: Track a specific button click
```javascript
import { trackGA4Event } from '@/components/Analytics';

// In your component
const handleSpecialButtonClick = () => {
  // Your button logic here

  // Track in both systems automatically
  trackGA4Event('special_button_click', {
    button_name: 'Download Brochure',
    location: 'services_section'
  });
};
```

The event will automatically be sent to:
1. Your custom backend (stored in database)
2. Google Analytics 4 (visible in GA4 reports)

---

## 📧 Support

If you need help with analytics:
1. Check this guide first
2. Review GA4 documentation: [support.google.com/analytics](https://support.google.com/analytics)
3. Contact your developer if custom tracking is needed

---

## ✅ System Health Checklist

Run this monthly to ensure everything is working:

- [ ] Dashboard loads without errors
- [ ] New leads appear in the leads table
- [ ] Export button downloads data successfully
- [ ] GA4 shows recent activity in Realtime report
- [ ] Backend server is running and accessible
- [ ] Database file exists and has data

---

**Your analytics system is now complete and working 24/7!**
No maintenance required. Just check your dashboard weekly and watch your business grow. 🚀