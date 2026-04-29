# Carta - Project Summary

## 🎯 Executive Summary

**Carta** is an AI-powered personal shopping agent designed to revolutionize online shopping in India. It helps users search, compare, and save money across multiple e-commerce marketplaces through intelligent automation and AI-driven insights.

### Quick Facts
- **Type**: Web Application (SaaS)
- **Target Market**: Indian E-commerce Shoppers
- **Stage**: MVP / Active Development
- **Version**: 0.1.0

---

## 🚀 What is Carta?

Carta is your autonomous buying agent that eliminates the hassle of comparing prices across multiple shopping platforms. Instead of manually checking Amazon, Flipkart, Myntra, AJIO, and Meesho, users can ask Carta in natural language and get instant, AI-powered recommendations.

### The Problem We Solve
- ❌ Time-consuming price comparisons across multiple sites
- ❌ Missing the best deals and price drops
- ❌ Difficulty finding the right product for specific needs
- ❌ Overwhelming product choices without expert guidance

### Our Solution
- ✅ Single search across 5+ marketplaces simultaneously
- ✅ AI-powered product recommendations
- ✅ Automated price tracking and alerts
- ✅ Natural language search ("best laptop for video editing under ₹80k")
- ✅ Smart comparison tools

---

## 🎯 Project Objectives

### Primary Goals
1. **Simplify Multi-Marketplace Shopping** - One search, all platforms
2. **Save Users Money** - Track prices, alert on drops, find best deals
3. **Provide Expert Guidance** - AI assistant for shopping decisions
4. **Save Time** - Eliminate manual comparison work

### Success Metrics
- User time saved per purchase decision
- Money saved through price tracking
- User engagement with AI assistant
- Number of successful product comparisons

---

## ✨ Core Features

### 1. 🤖 AI-Powered Search
- Natural language product search
- Powered by Google Gemini AI
- Understands context and user intent
- Example: "noise cancelling headphones for gym under ₹5000"

### 2. 🔍 Multi-Marketplace Integration
Search across:
- **Amazon India**
- **Flipkart**
- **Myntra**
- **AJIO**
- **Meesho**

### 3. 💬 AI Shopping Assistant
- Real-time chat interface
- Personalized recommendations
- Product comparisons
- Buying advice
- Review summaries

### 4. 📊 Smart Product Comparison
- Side-by-side comparison (up to 3 products)
- Price, specs, ratings comparison
- Visual comparison cards
- Best value recommendations

### 5. 📈 Price Tracking & Alerts
- Historical price data visualization
- Set target price alerts
- Email notifications on price drops
- "Best time to buy" recommendations

### 6. 📱 User Dashboard
Complete control center with:
- **Overview**: Stats, recent activity, quick actions
- **Search**: Advanced product search with filters
- **Comparison**: Product comparison tool
- **History**: Search and browsing history
- **Alerts**: Manage price alerts
- **Settings**: User preferences and notifications

### 7. 🎨 Modern UI/UX
- Clean, minimal design
- Dark mode support
- Smooth animations (Framer Motion)
- Responsive across all devices
- Accessible components (WCAG compliant)

---

## 🛠️ Technology Stack

### Frontend Framework
```
Next.js 16.2.4 (App Router)
├── React 19.2.4
├── TypeScript 5.x
└── Server & Client Components
```

### Styling & UI
```
Tailwind CSS 4.x
├── shadcn/ui 4.3.0 (Component Library)
├── Radix UI 1.4.3 (Primitives)
├── Framer Motion 12.38.0 (Animations)
└── Lucide React 0.453.0 (Icons)
```

### State Management
```
Redux Toolkit 2.11.2
└── React Redux 9.2.0
```

### Backend & Services
```
Authentication: Clerk 7.2.3
Database: Supabase 2.103.3
AI/ML: Google Gemini AI 0.24.1
```

### Development Tools
```
ESLint 9.x
PostCSS 4.x
TypeScript 5.x
```

---

## 📁 Project Structure

```
carta/
│
├── 📂 public/                    # Static assets
│   └── images/                   # Product & feature images
│
├── 📂 src/
│   ├── 📂 app/                   # Next.js App Router
│   │   ├── (auth)/               # Authentication pages
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   │
│   │   ├── api/                  # API Routes
│   │   │   ├── ai/chat/          # AI chat endpoint
│   │   │   └── products/search/  # Product search endpoint
│   │   │
│   │   ├── dashboard/            # Dashboard pages
│   │   │   ├── alerts/           # Price alerts
│   │   │   ├── comparison/       # Product comparison
│   │   │   ├── history/          # Search history
│   │   │   ├── search/           # Product search
│   │   │   ├── settings/         # User settings
│   │   │   └── page.tsx          # Dashboard home
│   │   │
│   │   ├── features/             # Features page
│   │   ├── how-it-works/         # How it works page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css           # Global styles
│   │
│   ├── 📂 components/            # React Components
│   │   ├── ai/                   # AI assistant component
│   │   ├── layout/               # Layout components
│   │   ├── providers/            # Context providers
│   │   ├── sections/             # Landing page sections
│   │   └── ui/                   # Reusable UI components
│   │
│   ├── 📂 lib/                   # Core Logic
│   │   ├── features/             # Redux slices
│   │   │   ├── shopping-slice.ts # Shopping state
│   │   │   └── ui-slice.ts       # UI state
│   │   ├── gemini.ts             # AI service
│   │   ├── marketplace-api.ts    # Marketplace integrations
│   │   ├── mock-data.ts          # Mock product data
│   │   ├── store.ts              # Redux store
│   │   ├── supabase.ts           # Database client
│   │   └── utils.ts              # Utilities
│   │
│   └── middleware.ts             # Auth middleware
│
├── 📄 .env.local.example         # Environment template
├── 📄 package.json               # Dependencies
├── 📄 next.config.ts             # Next.js config
├── 📄 tsconfig.json              # TypeScript config
└── 📄 README.md                  # Documentation
```

---

## 🏗️ System Architecture

### Architecture Layers

```
┌─────────────────────────────────────────┐
│         CLIENT LAYER                     │
│  Browser / Mobile Web / Desktop          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    PRESENTATION LAYER                    │
│  Next.js 16 + React 19 + TypeScript      │
│  • Pages & Layouts                       │
│  • Components (shadcn/ui)                │
│  • Animations (Framer Motion)            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    STATE MANAGEMENT                      │
│  Redux Toolkit                           │
│  • Shopping State                        │
│  • UI State                              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    API LAYER                             │
│  Next.js API Routes                      │
│  • /api/ai/chat                          │
│  • /api/products/search                  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    BUSINESS LOGIC                        │
│  • Gemini AI Service                     │
│  • Marketplace API Service               │
│  • Data Processing                       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    EXTERNAL SERVICES                     │
│  • Clerk (Auth)                          │
│  • Supabase (Database)                   │
│  • Google Gemini (AI)                    │
│  • Marketplace APIs                      │
└─────────────────────────────────────────┘
```

---

## 🔄 Key User Flows

### 1. Product Search Flow
```
User enters query → AI processes intent → Search all marketplaces 
→ Display results → User compares → Add to tracking
```

### 2. AI Assistant Flow
```
User asks question → Send to Gemini AI → AI analyzes 
→ Generate recommendation → Display in chat
```

### 3. Price Alert Flow
```
User sets target price → System tracks daily → Price drops 
→ Send notification → User makes purchase
```

---

## 📊 Current Status

### ✅ Completed Features
- Complete UI/UX redesign
- Landing page with hero, features, testimonials
- Full dashboard with all sub-pages
- AI assistant integration
- Mock data system (12+ products)
- Authentication with Clerk
- Dark mode support
- Responsive design
- Search functionality
- Product comparison
- Price tracking UI

### 🔄 In Progress
- Real marketplace API integration
- Price tracking automation
- Email notification system
- Advanced filtering

### 📋 Planned Features
- Browser extension
- Mobile app (React Native)
- Social sharing
- Wishlist management
- Price prediction ML model
- Multi-language support

---

## 🎨 Design Philosophy

### Visual Identity
- **Primary Color**: Emerald Green (#10b981)
- **Style**: Clean, minimal, modern
- **Typography**: Plus Jakarta Sans (body), Bricolage Grotesque (headings)
- **Spacing**: Consistent 4px grid system
- **Borders**: Rounded corners (12px-24px)

### UX Principles
1. **Simplicity First** - Minimal clicks to value
2. **Speed** - Fast load times, instant feedback
3. **Clarity** - Clear information hierarchy
4. **Accessibility** - WCAG compliant components
5. **Delight** - Smooth animations, micro-interactions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Quick Setup
```bash
# Clone repository
git clone <repo-url>
cd carta

# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

### Required API Keys
- **Gemini API Key** (Required for AI features)
- **Clerk Keys** (Required for authentication)
- **Marketplace APIs** (Optional - uses mock data without)

---

## 📈 Business Model

### Target Users
- **Primary**: Tech-savvy online shoppers (18-45 years)
- **Secondary**: Deal hunters, comparison shoppers
- **Geographic**: India (initially)

### Revenue Streams (Planned)
1. **Affiliate Commissions** - From marketplace purchases
2. **Premium Subscription** - Advanced features
3. **API Access** - For developers
4. **Sponsored Listings** - Featured products

### Competitive Advantages
- ✅ AI-powered natural language search
- ✅ Multi-marketplace in one place
- ✅ Automated price tracking
- ✅ Modern, fast UI/UX
- ✅ Free to use (basic features)

---

## 🔒 Security & Privacy

### Security Measures
- Clerk authentication (industry-standard)
- Environment variable protection
- API route protection
- Input validation & sanitization
- HTTPS enforcement

### Privacy Commitment
- No selling of user data
- Transparent data usage
- GDPR compliant (planned)
- User data deletion on request

---

## 📱 Responsive Design

### Supported Devices
- ✅ Desktop (1920px+)
- ✅ Laptop (1280px - 1920px)
- ✅ Tablet (768px - 1280px)
- ✅ Mobile (320px - 768px)

### Mobile-First Approach
- Base styles optimized for mobile
- Progressive enhancement for larger screens
- Touch-friendly UI elements
- Optimized images for bandwidth

---

## 🧪 Testing & Quality

### Current Testing
- Manual testing with mock data
- Cross-browser compatibility
- Responsive design testing
- Accessibility testing

### Planned Testing
- Unit tests (Jest)
- Integration tests (Playwright)
- E2E tests for critical flows
- Performance testing
- Load testing

---

## 📊 Performance Metrics

### Current Performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+

### Optimization Techniques
- Next.js automatic code splitting
- Image optimization with next/image
- Lazy loading for heavy components
- Redux Toolkit for efficient state updates
- Framer Motion optimized animations

---

## 🌍 Deployment

### Recommended Platform
**Vercel** (Optimized for Next.js)

### Deployment Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Alternative Platforms
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

---

## 🗺️ Roadmap

### Phase 1: MVP (Current)
**Timeline**: Q1-Q2 2026
- ✅ Core UI/UX
- ✅ Mock data system
- ✅ AI assistant
- ✅ Authentication
- ✅ Basic search & comparison

### Phase 2: Market Launch
**Timeline**: Q3 2026
- ⏳ Real marketplace API integration
- ⏳ Price tracking automation
- ⏳ Email notifications
- ⏳ Advanced filters & sorting
- ⏳ User onboarding flow

### Phase 3: Growth
**Timeline**: Q4 2026
- 📋 Browser extension
- 📋 Mobile app
- 📋 Social features
- 📋 Wishlist sharing
- 📋 Referral program

### Phase 4: Scale
**Timeline**: 2027
- 📋 Price prediction ML model
- 📋 Multi-language support
- 📋 International expansion
- 📋 B2B API offering
- 📋 White-label solution

---

## 👥 Team & Collaboration

### Development Stack Skills Required
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, API development
- **Database**: Supabase, PostgreSQL
- **AI/ML**: Google Gemini, prompt engineering
- **DevOps**: Vercel, Git, CI/CD

### Contributing
We welcome contributions! See `CONTRIBUTING.md` for guidelines.

---

## 📚 Documentation

### Available Docs
- `README.md` - Getting started guide
- `PROJECT_DOCUMENTATION.md` - Complete technical documentation
- `PROJECT_SUMMARY.md` - This file
- `MARKETPLACE_INTEGRATION.md` - API integration guide
- `REDESIGN_NOTES.md` - Design decisions
- `SETUP_COMPLETE.md` - Setup checklist

---

## 🎯 Key Differentiators

### What Makes Carta Unique?

1. **AI-First Approach**
   - Natural language understanding
   - Context-aware recommendations
   - Conversational interface

2. **True Multi-Marketplace**
   - Single search, all platforms
   - Unified comparison
   - No platform bias

3. **Automation**
   - Set it and forget it price tracking
   - Automatic alerts
   - Smart notifications

4. **Modern Experience**
   - Fast, responsive UI
   - Beautiful design
   - Delightful interactions

5. **User-Centric**
   - Free to use
   - No ads (initially)
   - Privacy-focused

---

## 📞 Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Gemini AI Docs](https://ai.google.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- GitHub Issues
- Discord Server (planned)
- Email Support

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🎉 Conclusion

Carta represents the future of online shopping in India - intelligent, automated, and user-friendly. By combining AI technology with multi-marketplace integration, we're building a platform that saves users time and money while providing an exceptional shopping experience.

### Vision Statement
*"To become India's most trusted AI shopping companion, helping millions of users make smarter buying decisions every day."*

---

**Project**: Carta - AI-Powered Personal Shopping Agent  
**Version**: 0.1.0  
**Status**: Active Development  
**Last Updated**: April 22, 2026  
**Tech Stack**: Next.js 16 + React 19 + TypeScript + Gemini AI  
**Platform**: Web (Browser Extension & Mobile App Planned)

---

*Built with ❤️ for smarter shopping*
