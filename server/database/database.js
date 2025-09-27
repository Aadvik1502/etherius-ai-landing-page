import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Database {
    constructor() {
        this.db = null;
        this.init();
    }

    init() {
        try {
            // Create database connection
            const dbPath = process.env.DB_PATH || join(__dirname, 'leads.db');

            this.db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    throw err;
                }
                console.log('✅ Connected to SQLite database');
            });

            // Enable foreign keys
            this.db.run('PRAGMA foreign_keys = ON');

            // Initialize schema
            this.initSchema();
        } catch (error) {
            console.error('Database initialization error:', error);
            throw error;
        }
    }

    initSchema() {
        try {
            const schemaPath = join(__dirname, 'schema.sql');
            const schema = readFileSync(schemaPath, 'utf8');

            this.db.exec(schema, (err) => {
                if (err) {
                    console.error('Error creating schema:', err.message);
                    throw err;
                }
                console.log('✅ Database schema initialized');
            });
        } catch (error) {
            console.error('Schema initialization error:', error);
            throw error;
        }
    }

    // Lead management methods
    async createLead(leadData) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO leads (
                    uuid, full_name, email, company_name, phone_number,
                    industry, company_size, ai_experience, primary_interest,
                    business_challenge, ai_motivation, timeline, investment_range,
                    ip_address, user_agent, referrer, utm_source, utm_medium, utm_campaign
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const params = [
                leadData.uuid,
                leadData.fullName,
                leadData.email,
                leadData.companyName,
                leadData.phoneNumber,
                leadData.industry,
                leadData.companySize,
                leadData.aiExperience,
                leadData.primaryInterest || null,
                leadData.businessChallenge || null,
                leadData.aiMotivation || null,
                leadData.timeline,
                leadData.investmentRange,
                leadData.ipAddress || null,
                leadData.userAgent || null,
                leadData.referrer || null,
                leadData.utmSource || null,
                leadData.utmMedium || null,
                leadData.utmCampaign || null
            ];

            this.db.run(sql, params, function(err) {
                if (err) {
                    console.error('Error creating lead:', err.message);
                    reject(err);
                } else {
                    console.log(`✅ Lead created with ID: ${this.lastID}`);
                    resolve({ id: this.lastID, uuid: leadData.uuid });
                }
            });
        });
    }

    async getLeadById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM leads WHERE id = ?';

            this.db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    async getAllLeads(limit = 100, offset = 0) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM leads
                ORDER BY created_at DESC
                LIMIT ? OFFSET ?
            `;

            this.db.all(sql, [limit, offset], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async updateLeadStatus(id, status, notes = null) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE leads
                SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `;

            this.db.run(sql, [status, notes, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }

    // Analytics methods
    async trackEvent(eventType, eventData, metadata = {}) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO analytics (
                    event_type, event_data, ip_address, user_agent,
                    referrer, page_url, session_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const params = [
                eventType,
                JSON.stringify(eventData),
                metadata.ipAddress || null,
                metadata.userAgent || null,
                metadata.referrer || null,
                metadata.pageUrl || null,
                metadata.sessionId || null
            ];

            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    // Email logging
    async logEmail(leadId, emailTo, subject, body, status, errorMessage = null) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO email_logs (
                    lead_id, email_to, email_subject, email_body, status, error_message
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            this.db.run(sql, [leadId, emailTo, subject, body, status, errorMessage], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    // Mark lead as emailed
    async markLeadEmailed(leadId) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE leads
                SET email_sent = TRUE, email_sent_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `;

            this.db.run(sql, [leadId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            });
        });
    }

    // Get analytics data
    async getAnalytics(eventType = null, startDate = null, endDate = null) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM analytics';
            const params = [];
            const conditions = [];

            if (eventType) {
                conditions.push('event_type = ?');
                params.push(eventType);
            }

            if (startDate) {
                conditions.push('created_at >= ?');
                params.push(startDate);
            }

            if (endDate) {
                conditions.push('created_at <= ?');
                params.push(endDate);
            }

            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ');
            }

            sql += ' ORDER BY created_at DESC';

            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
    }
}

export default Database;