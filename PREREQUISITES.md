# Prerequisites Checklist

Use this guide to verify you have all prerequisites to run the improved Pa J.I. Emerhana Foundation website.

## 📋 System Requirements

### Required Software

#### 1. Node.js (v18 or higher)
**Check if installed:**
```bash
node --version
```
**Expected output:** `v18.x.x` or higher

**Install if missing:**
- **Windows/Mac:** Download from [nodejs.org](https://nodejs.org/)
- **Linux:** `sudo apt-get install nodejs` (Ubuntu/Debian) or use [nvm](https://github.com/nvm-sh/nvm)

#### 2. npm (v9 or higher)
**Check if installed:**
```bash
npm --version
```
**Expected output:** `9.x.x` or higher

**Note:** npm comes with Node.js. If missing, reinstall Node.js.

#### 3. Git
**Check if installed:**
```bash
git --version
```
**Expected output:** `git version 2.x.x`

**Install if missing:**
- **Windows:** [git-scm.com](https://git-scm.com/)
- **Mac:** `brew install git`
- **Linux:** `sudo apt-get install git`

### Optional (for full Docker setup)

#### 4. Docker & Docker Compose
**Check if installed:**
```bash
docker --version
docker-compose --version
```
**Expected output:** Docker version 20.x.x and Docker Compose version 2.x.x

**Install if missing:**
- **All platforms:** [docker.com](https://www.docker.com/products/docker-desktop/)

## 🔧 Development Tools

### Recommended (but not required)

#### 5. VS Code (or other IDE)
- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Recommended extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

#### 6. Database (if using database features)
- **PostgreSQL 15+** (optional)
  - Check: `psql --version`
  - Install: [postgresql.org](https://www.postgresql.org/download/)

#### 7. SMTP Server Access
- Gmail account (for testing)
- Or access to SMTP server credentials
- Or email service API keys (SendGrid, Mailgun, etc.)

## 📦 Dependencies Check

### Check Project Dependencies

From the project root directory:

```bash
# Check if node_modules exists
ls node_modules

# If missing, install dependencies
npm install
```

**Expected:** `node_modules` folder with many packages

### Check if all required packages are installed

```bash
npm list --depth=0
```

Look for these key packages:
- `react`
- `react-dom`
- `vite`
- `@tanstack/react-query`
- `framer-motion`
- `tailwindcss`
- `@radix-ui/*`

## 🐳 Docker Check (Optional)

If you want to use Docker:

```bash
# Check Docker is running
docker ps

# Should show running containers or empty list (no error)
```

**Test Docker:**
```bash
docker run hello-world
```

**Expected:** "Hello from Docker!" message

## 🌐 Network Requirements

### Required Access
- Port 5173 (development) or 80/443 (production) for web server
- Port 3001 for backend API (if running separately)
- Outbound SMTP (port 587, 465, or 25) for email functionality
- Outbound HTTPS for:
  - Google Analytics
  - Hotjar
  - Sentry
  - Package downloads (npm)

### Firewall Rules
Ensure your firewall allows:
- Inbound: 80, 443 (web), 5173 (dev), 3001 (API)
- Outbound: 443 (HTTPS), 587/465 (SMTP)

## 🔐 Environment Variables

### Check if you have access to:
- SMTP credentials (email sending)
- Google Analytics ID (optional)
- Hotjar ID (optional)
- Sentry DSN (optional)

**Quick test:** Create a `.env.local` file with:
```bash
VITE_API_BASE_URL=http://localhost:3001/api
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@emerhana-foundation.org
```

## 🧪 Quick Verification Tests

### Test 1: Frontend Build
```bash
npm run build
```
**Expected:** Build completes successfully in `dist/` folder

### Test 2: Development Server
```bash
npm run dev
```
**Expected:** Server starts on http://localhost:5173

### Test 3: Backend Server (if running)
```bash
cd server
npm install
npm run dev
```
**Expected:** Server starts on http://localhost:3001

### Test 4: API Health Check
```bash
curl http://localhost:3001/api/health
```
**Expected:** `{"status":"ok","timestamp":"..."}`

### Test 5: TypeScript Check
```bash
npx tsc --noEmit
```
**Expected:** No errors (warnings are okay)

### Test 6: Linting
```bash
npm run lint
```
**Expected:** No errors (warnings are okay)

## 📊 Minimum System Specs

### For Development
- **OS:** Windows 10+, macOS 10.15+, Linux Ubuntu 20.04+
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 2GB free for dependencies
- **CPU:** Any modern processor

### For Production (Docker)
- **OS:** Any with Docker support
- **RAM:** 512MB minimum for containers
- **Disk Space:** 1GB for images
- **CPU:** 1 core minimum

## 🚨 Common Issues & Solutions

### Issue: `node: command not found`
**Solution:** Install Node.js from nodejs.org

### Issue: `npm: command not found`
**Solution:** Reinstall Node.js or add npm to PATH

### Issue: `EACCES` errors during npm install
**Solution:** Don't use sudo with npm. Fix permissions:
```bash
sudo chown -R $USER:$USER ~/.npm
```

### Issue: Port already in use
**Solution:** Change port in configuration or stop other service:
```bash
# Find process using port 5173
lsof -i :5173
# Kill process
kill -9 <PID>
```

### Issue: Docker not running
**Solution:** Start Docker Desktop or Docker daemon

## ✅ Pre-Development Checklist

Before starting development, ensure:

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Development server starts (`npm run dev`)
- [ ] No build errors (`npm run build`)

## 🎯 Quick Start (If All Prerequisites Met)

1. **Clone and setup:**
```bash
git clone <repository-url>
cd niger-delta-leaders-main
npm install
cp .env.example .env.local
# Edit .env.local with your values
```

2. **Start development:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to http://localhost:5173

4. **Start backend (optional):**
```bash
cd server
npm install
npm run dev
```

## 📞 Need Help?

If you're missing prerequisites:
1. Follow the installation links above
2. Restart your terminal/computer after installation
3. Verify with the check commands
4. Refer to DEPLOYMENT.md for detailed setup

---

**Last Updated:** January 2024
**Status:** All prerequisites listed are free and open-source