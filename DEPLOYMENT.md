# Carta - Deployment Guide

## 🚀 Pre-Deployment Checklist

### ✅ Code Quality
- [x] Build passes without errors (`npm run build`)
- [x] No TypeScript errors
- [x] All components render correctly
- [x] API routes tested and working

### ✅ Environment Variables
Ensure these are configured in your deployment platform:

#### Required (for full functionality)
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

#### Optional (app works with mock data without these)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_AMAZON_API_KEY=your_amazon_key
NEXT_PUBLIC_FLIPKART_API_KEY=your_flipkart_key
NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY=your_google_key
```

### ✅ Security
- [x] `.env.local` is in `.gitignore`
- [x] No API keys in source code
- [x] Authentication middleware configured
- [x] API routes have error handling

### ✅ Performance
- [x] Images optimized with next/image
- [x] Code splitting enabled
- [x] Lazy loading for heavy components

---

## 📦 Deployment Platforms

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Optimized for Next.js
- Zero configuration
- Automatic HTTPS
- Edge network CDN
- Free tier available

**Steps:**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables from `.env.local.example`
   - Add them for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

**Vercel CLI (Alternative)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all required variables

**netlify.toml** (optional configuration):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

### Option 3: Railway

**Steps:**

1. **Go to [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**
   - Railway auto-detects Next.js
   - Add environment variables in Settings

4. **Deploy**
   - Automatic deployment on push

---

### Option 4: AWS Amplify

**Steps:**

1. **Go to AWS Amplify Console**

2. **Connect Repository**
   - Choose GitHub
   - Select your repository
   - Select branch (main)

3. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Environment Variables**
   - Add in App Settings → Environment Variables

5. **Deploy**

---

### Option 5: DigitalOcean App Platform

**Steps:**

1. **Create App**
   - Go to DigitalOcean → Apps
   - Create App from GitHub

2. **Configure**
   - Detected as Node.js app
   - Build command: `npm run build`
   - Run command: `npm start`

3. **Environment Variables**
   - Add in Settings tab

4. **Deploy**

---

## 🔧 Build Configuration

### Next.js Configuration
The app is configured in `next.config.ts`:
```typescript
{
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'img.clerk.com' }
    ]
  }
}
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## 🌍 Environment-Specific Configuration

### Development
```env
NODE_ENV=development
```
- Uses `.env.local`
- Hot reload enabled
- Detailed error messages

### Production
```env
NODE_ENV=production
```
- Optimized build
- Minified code
- Error tracking recommended

---

## 📊 Post-Deployment Checklist

### ✅ Functionality Testing
- [ ] Landing page loads correctly
- [ ] Authentication works (sign in/up)
- [ ] Dashboard accessible after login
- [ ] Product search returns results
- [ ] AI assistant responds
- [ ] Product comparison works
- [ ] Dark mode toggle works
- [ ] Mobile responsive design works

### ✅ Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console errors in production

### ✅ SEO
- [ ] Meta tags present
- [ ] Open Graph tags configured
- [ ] Sitemap generated (optional)
- [ ] robots.txt configured (optional)

---

## 🔍 Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
   - Automatic performance monitoring
   - Real user metrics

2. **Google Analytics**
   ```typescript
   // Add to src/app/layout.tsx
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
   ```

3. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/nextjs
   ```

4. **LogRocket** (Session Replay)
   ```bash
   npm install logrocket
   ```

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build fails with module not found
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Issue**: TypeScript errors
```bash
# Solution: Check types
npm run build
# Fix any TypeScript errors shown
```

### Environment Variables Not Working

**Issue**: API calls fail in production
- Verify variables are set in deployment platform
- Check variable names match exactly (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding variables

### Authentication Issues

**Issue**: Clerk authentication not working
- Verify Clerk keys are correct
- Check Clerk dashboard for domain configuration
- Add production domain to Clerk allowed origins

### Images Not Loading

**Issue**: Images return 404
- Check `next.config.ts` has correct domains
- Verify image paths are correct
- Ensure images are in `public/` directory

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test # if you have tests
```

---

## 📱 Mobile App Deployment (Future)

When ready to deploy mobile apps:

### iOS (App Store)
- Requires Apple Developer account ($99/year)
- Use React Native or Capacitor
- Submit through App Store Connect

### Android (Play Store)
- Requires Google Play Developer account ($25 one-time)
- Use React Native or Capacitor
- Submit through Google Play Console

---

## 🔐 Security Best Practices

### Before Deployment
- [ ] Remove all `console.log` statements (or use proper logging)
- [ ] Enable HTTPS only
- [ ] Set up CORS properly
- [ ] Implement rate limiting on API routes
- [ ] Add security headers

### Security Headers (add to `next.config.ts`)
```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ]
}
```

---

## 📈 Scaling Considerations

### When to Scale
- More than 10,000 daily active users
- API response times > 2 seconds
- Database queries slow

### Scaling Options
1. **Vercel Pro** - More bandwidth, faster builds
2. **Database Optimization** - Add indexes, caching
3. **CDN** - Cloudflare for static assets
4. **API Caching** - Redis for frequent queries
5. **Load Balancing** - Multiple server instances

---

## 💰 Cost Estimates

### Free Tier (Hobby Projects)
- **Vercel**: Free (100GB bandwidth/month)
- **Clerk**: Free (10,000 MAU)
- **Supabase**: Free (500MB database)
- **Gemini API**: Free tier available
- **Total**: $0/month

### Production (Small Business)
- **Vercel Pro**: $20/month
- **Clerk Pro**: $25/month
- **Supabase Pro**: $25/month
- **Gemini API**: Pay per use (~$10-50/month)
- **Total**: ~$80-140/month

---

## 🎉 Launch Checklist

### Pre-Launch
- [ ] All features tested
- [ ] Environment variables configured
- [ ] Custom domain connected (optional)
- [ ] Analytics set up
- [ ] Error tracking configured
- [ ] Backup strategy in place

### Launch Day
- [ ] Deploy to production
- [ ] Test all critical flows
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Announce on social media

### Post-Launch
- [ ] Monitor user feedback
- [ ] Track analytics
- [ ] Fix critical bugs immediately
- [ ] Plan next features

---

## 📞 Support

### Resources
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Clerk Documentation](https://clerk.com/docs)

### Community
- GitHub Issues
- Discord Server (if available)
- Email Support

---

**Ready to deploy?** Follow the Vercel steps above for the easiest deployment experience!

**Last Updated**: April 29, 2026
**Version**: 1.0.0
