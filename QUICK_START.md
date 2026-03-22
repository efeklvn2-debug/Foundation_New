# Quick Start Guide

Get the Pa J.I. Emerhana Foundation website up and running in 5 minutes!

## 🎯 For Non-Technical Users

### Option 1: Use Vercel (Easiest - No Setup Required)

1. **Push to GitHub**
   - Create a new repository on GitHub
   - Push your code to GitHub

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Import your GitHub repository
   - Vercel will automatically deploy
   - Add your custom domain in settings

3. **Configure Environment Variables**
   In Vercel dashboard → Project Settings → Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX (optional)
   ```

**That's it!** Your site is live.

---

## 🛠️ For Technical Users

### Option 2: Docker (Recommended for Full Control)

#### Prerequisites Check
```bash
# Check Node.js
node --version  # Should be v18+

# Check Docker
docker --version  # Should be 20.x+

# Check Docker Compose
docker-compose --version  # Should be 2.x+
```

#### Quick Setup
```bash
# 1. Clone and navigate
cd niger-delta-leaders-main

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env with your values
# (SMTP credentials, API URLs, etc.)

# 4. Start everything
docker-compose up -d

# 5. Access your site
# Frontend: http://localhost
# Backend API: http://localhost:3001/api/health
```

---

## 📧 Email Setup (Required for Contact Form)

### Using Gmail (Free)
1. Go to your Google Account
2. Enable 2-Factor Authentication
3. Generate an App Password
4. Use in `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

### Using Other Providers
- **SendGrid:** smtp.sendgrid.net, port 587
- **Mailgun:** smtp.mailgun.org, port 587
- **AWS SES:** email-smtp.region.amazonaws.com, port 587

---

## 🔧 Backend Setup (If Not Using Docker)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Build
npm run build

# Start
npm start

# Or for development with auto-reload
npm run dev
```

---

## 📱 Testing Your Setup

### 1. Test Frontend
```bash
npm run dev
# Open http://localhost:5173
```

### 2. Test Backend
```bash
curl http://localhost:3001/api/health
# Should return: {"status":"ok",...}
```

### 3. Test Contact Form
- Fill out contact form on website
- Check email inbox for notification
- Check backend logs for submission

### 4. Test Donation Form
- Fill out donation form
- Submit and check for success message
- Check email for confirmation

---

## 🐛 Troubleshooting

### "Port already in use"
```bash
# Find and kill process
lsof -i :5173  # or :3001
kill -9 <PID>
```

### "Module not found"
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### "Emails not sending"
- Check SMTP credentials
- Verify app password (not regular password)
- Check spam folder
- Review SMTP server logs

### "API connection failed"
- Verify `VITE_API_BASE_URL` in .env
- Ensure backend is running
- Check CORS configuration

---

## 📚 Documentation

- **PREREQUISITES.md** - System requirements and checks
- **IMPROVEMENTS.md** - Detailed feature documentation
- **DEPLOYMENT.md** - Complete deployment guide
- **QUICK_START.md** - This file

---

## 🆘 Need Help?

1. **Check the logs:**
   - Frontend: Browser console (F12)
   - Backend: Terminal where server is running
   - Docker: `docker-compose logs`

2. **Common issues:**
   - Port conflicts → Change ports in configuration
   - Missing env vars → Check `.env` file
   - SMTP errors → Verify credentials and app password

3. **Still stuck?**
   - Review IMPROVEMENTS.md for detailed docs
   - Check DEPLOYMENT.md for deployment issues
   - Contact development team

---

## ✅ Success Checklist

- [ ] Node.js v18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Frontend runs (`npm run dev`)
- [ ] Backend runs (if using) (`npm run dev` in server/)
- [ ] Contact form sends emails
- [ ] Donation form submits successfully
- [ ] Analytics tracking active (optional)
- [ ] Site accessible via browser

---

**Ready to go live?** Follow DEPLOYMENT.md for production deployment instructions.