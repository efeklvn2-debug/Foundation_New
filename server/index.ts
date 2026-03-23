import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import pino from 'pino';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3001;
const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' });

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:8080'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Donation endpoint
app.post(
  '/api/donations',
  [
    body('amount').isInt({ min: 1 }).withMessage('Amount must be a positive number'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('paymentMethod').isIn(['bank_transfer', 'online']).optional(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const { amount, name, email, paymentMethod } = req.body;

      // Log donation
      logger.info('Donation received', {
        amount,
        name,
        email,
        paymentMethod,
        timestamp: new Date().toISOString(),
      });

      // Store in database (placeholder - implement with your DB)
      // await db.donations.create({ amount, name, email, paymentMethod });

      res.json({
        success: true,
        message: 'Donation recorded successfully',
        data: { amount, name, email, paymentMethod },
      });
    } catch (error) {
      logger.error('Donation error', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
);

// Contact form endpoint
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array(),
        });
      }

      const { name, email, message } = req.body;

      // Send email notification
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@emerhana-foundation.org',
        to: process.env.CONTACT_EMAIL || 'info@emerhana-foundation.org',
        subject: `New Contact Form Submission - Pa J.I. Emerhana Foundation`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Submission</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #64748b; font-size: 14px;">
              This email was sent from the Pa J.I. Emerhana Foundation website.
            </p>
          </div>
        `,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);

      // Log contact submission
      logger.info('Contact form submitted', {
        name,
        email,
        messageLength: message.length,
        timestamp: new Date().toISOString(),
      });

      // Store in database (placeholder)
      // await db.contacts.create({ name, email, message });

      res.json({
        success: true,
        message: 'Message sent successfully',
      });
    } catch (error) {
      logger.error('Contact form error', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send message',
      });
    }
  }
);

// Email sending endpoint (for sending emails to donors)
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@emerhana-foundation.org',
      to,
      subject,
      html,
      text,
    };

    await transporter.sendMail(mailOptions);

    logger.info('Email sent', { to, subject });

    res.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    logger.error('Email sending error', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
    });
  }
});

// Error logging endpoint
app.post('/api/logs', (req, res) => {
  try {
    const { level, message, context, stack } = req.body;
    
    if (level === 'error') {
      logger.error(message, { context, stack });
    } else if (level === 'warn') {
      logger.warn(message, context);
    } else {
      logger.info(message, context);
    }

    res.json({ success: true });
  } catch (error) {
    logger.error('Log submission error', error);
    res.status(500).json({ success: false });
  }
});

// Security violations endpoint
app.post('/api/security/violations', (req, res) => {
  try {
    const violation = req.body;
    logger.warn('Security violation detected', violation);
    res.json({ success: true });
  } catch (error) {
    logger.error('Security violation logging error', error);
    res.status(500).json({ success: false });
  }
});

// CMS endpoints (placeholder for future implementation)
app.get('/api/cms/:contentType', async (req, res) => {
  try {
    const { contentType } = req.params;
    const { limit = 20, page = 1 } = req.query;

    // Placeholder - implement database query
    const data: any[] = [];
    const total = 0;

    res.json({
      data,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    logger.error('CMS query error', error);
    res.status(500).json({ success: false, error: 'Failed to fetch content' });
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;