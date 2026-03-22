# Deployment Guide for Pa J.I. Emerhana Foundation Website

This guide covers the deployment of the improved website with all backend integrations, security features, and DevOps improvements.

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd niger-delta-leaders-main
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. **Build and run**
```bash
docker-compose up -d
```

4. **Access the application**
- Website: http://localhost
- API: http://localhost:3001/api/health

### Option 2: Manual Deployment

#### Frontend (Vercel/Netlify)
1. Connect repository to Vercel/Netlify
2. Set environment variables in platform settings
3. Deploy automatically on push to main branch

#### Backend (Railway/Render/AWS)
1. Deploy `server/` directory to your chosen platform
2. Set environment variables
3. Configure CORS to allow your frontend domain
4. Set up SMTP for email functionality

## 🔧 Environment Configuration

### Required Variables

```bash
# Frontend
VITE_API_BASE_URL=https://your-backend-url.com/api

# Backend
PORT=3001
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@emerhana-foundation.org
CONTACT_EMAIL=info@emerhana-foundation.org
ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Optional Variables

```bash
# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_HOTJAR_ID=YOUR_HOTJAR_ID
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Database (if using)
DATABASE_URL=postgresql://username:password@host:5432/database

# Payment Gateway
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx
```

## 📧 Email Configuration

### Gmail SMTP Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the app password as `SMTP_PASS`

### Other SMTP Providers
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587
- **AWS SES**: email-smtp.region.amazonaws.com, port 587

## 🔒 Security Checklist

- [ ] Set strong SMTP passwords
- [ ] Configure CORS to specific origins only
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up environment variables securely
- [ ] Configure rate limiting
- [ ] Enable security headers (automatic)
- [ ] Set up SSL certificates
- [ ] Configure firewall rules
- [ ] Regular security updates

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property at analytics.google.com
2. Get Measurement ID (format: G-XXXXXXXXXX)
3. Add to environment: `VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`

### Hotjar
1. Create Hotjar account
2. Get Site ID
3. Add to environment: `VITE_HOTJAR_ID=XXXXXX`

### Sentry Error Tracking
1. Create Sentry project
2. Get DSN
3. Add to environment: `VITE_SENTRY_DSN=https://...`

## 🗄️ Database Setup (Optional)

### PostgreSQL Setup
```bash
# Using Docker
docker run -d \
  --name emerhana-postgres \
  -e POSTGRES_DB=emerhana_foundation \
  -e POSTGRES_PASSWORD=your-password \
  -p 5432:5432 \
  postgres:15-alpine
```

Update `.env`:
```bash
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/emerhana_foundation
```

### Database Schema (to be implemented)
```sql
-- Donations table
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Production Deployment

### Vercel (Frontend)
1. Import repository from GitHub
2. Configure environment variables
3. Add custom domain
4. Enable automatic deployments

### Backend Options

#### Railway
```bash
# Connect GitHub repository
# Set environment variables
# Deploy automatically
```

#### Render
1. Create new Web Service
2. Connect repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

#### AWS EC2
```bash
# SSH into instance
git clone <repository>
cd niger-delta-leaders-main/server
npm ci --only=production
npm run build
npm start

# Use PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name "emerhana-api"
```

## 🔍 Monitoring & Maintenance

### Health Checks
- API: `GET /api/health`
- Expected response: `{"status":"ok","timestamp":"..."}`

### Logs
- Application logs: Check your hosting platform's log viewer
- Docker logs: `docker-compose logs -f backend`
- PM2 logs: `pm2 logs emerhana-api`

### Performance Monitoring
- Check Google Analytics for Core Web Vitals
- Monitor Sentry for errors
- Review Hotjar recordings for UX insights

### Security Monitoring
- Review security logs regularly
- Monitor for failed login attempts
- Check for unusual traffic patterns

## 🧪 Testing

### Pre-deployment Checklist
- [ ] All tests pass (`npm run test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] ESLint passes (`npm run lint`)
- [ ] Environment variables configured
- [ ] SMTP tested
- [ ] API endpoints tested
- [ ] SSL certificate installed

### Post-deployment Testing
- [ ] Website loads correctly
- [ ] All pages render properly
- [ ] Forms submit successfully
- [ ] Donation flow works
- [ ] Contact form sends emails
- [ ] Analytics tracking active
- [ ] Error tracking active
- [ ] Performance metrics acceptable

## 🆘 Troubleshooting

### Common Issues

**Emails not sending**
- Check SMTP credentials
- Verify SMTP host and port
- Check spam folder
- Review SMTP logs

**API connection errors**
- Verify `VITE_API_BASE_URL` is correct
- Check CORS configuration
- Ensure backend is running
- Check firewall rules

**Build failures**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall
- Check Node.js version (should be 18+)
- Review error logs

**Performance issues**
- Enable gzip compression
- Optimize images
- Check database queries
- Review caching strategy

## 📞 Support

For deployment issues:
1. Check this guide thoroughly
2. Review logs for specific errors
3. Consult platform documentation
4. Contact development team

## 🔄 Updates & Maintenance

### Regular Tasks
- Update dependencies monthly
- Review security logs weekly
- Check analytics daily
- Monitor performance weekly
- Backup database regularly

### Update Process
1. Pull latest changes
2. Run tests
3. Build application
4. Deploy to staging
5. Test staging environment
6. Deploy to production
7. Monitor for issues

---

**Need Help?** Check the main IMPROVEMENTS.md for detailed documentation on all features.