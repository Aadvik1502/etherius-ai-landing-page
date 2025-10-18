-- Etherius AI Lead Management Database Schema

-- Leads table to store contact form submissions
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,

    -- Contact Information
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,

    -- Business Context
    industry TEXT NOT NULL,

    -- AI Specific Information
    ai_experience TEXT NOT NULL,
    primary_interest TEXT,
    business_challenge TEXT,
    ai_motivation TEXT,

    -- Metadata
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,

    -- Status and Follow-up
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    assigned_to TEXT,
    notes TEXT,

    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_contacted DATETIME,

    -- Email tracking
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at DATETIME
);

-- Analytics table for tracking website performance
CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    event_data TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    page_url TEXT,
    session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Email logs for tracking sent emails
CREATE TABLE IF NOT EXISTS email_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    email_to TEXT NOT NULL,
    email_subject TEXT NOT NULL,
    email_body TEXT,
    status TEXT CHECK (status IN ('sent', 'failed', 'bounce')),
    error_message TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (lead_id) REFERENCES leads (id) ON DELETE SET NULL
);

-- Admin users table (for future dashboard access)
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'viewer')),
    active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads (industry);
CREATE INDEX IF NOT EXISTS idx_leads_ai_experience ON leads (ai_experience);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics (created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics (session_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_email_to ON email_logs (email_to);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs (sent_at);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs (status);

CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users (username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);