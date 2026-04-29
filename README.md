# Carta - AI-Powered Personal Shopping Agent

Your autonomous buying agent. Search, compare, and save smarter with Carta AI.

## 🚀 Features

- **AI-Powered Search**: Natural language product search across multiple marketplaces
- **Smart Comparison**: Compare products across Amazon, Flipkart, Myntra, AJIO, and Meesho
- **Price Tracking**: Set alerts and track price history
- **AI Assistant**: Get personalized shopping advice powered by Google Gemini
- **Multi-Marketplace**: Search across 5+ Indian marketplaces simultaneously
- **Mock Data System**: Fully functional with 12+ products for testing and development

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Authentication**: Clerk
- **Database**: Supabase
- **AI**: Google Gemini API

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd carta
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your API keys to `.env.local`:
```env
# Required for AI features
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Required for authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Optional - for real marketplace data
NEXT_PUBLIC_AMAZON_API_KEY=your_amazon_key
NEXT_PUBLIC_FLIPKART_API_KEY=your_flipkart_key
NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY=your_google_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Current Status

### ✅ Completed
- Complete UI redesign with clean, minimal aesthetic
- AI assistant with Gemini integration
- Mock data system with 12+ products
- Search functionality across multiple categories
- Product comparison features
- Price alerts and history tracking
- Dashboard with all sub-pages
- Authentication with Clerk
- Dark mode support

### 🔄 In Progress
- Real marketplace API integration
- Price tracking automation
- Email notifications for alerts

### 📋 Planned
- Browser extension
- Mobile app
- Advanced AI recommendations
- Social sharing features

## 🏪 Marketplace Integration

The app currently uses **mock data** for development and testing. To enable real marketplace data:

1. Get API keys from:
   - [Amazon Product Advertising API](https://webservices.amazon.com/paapi5/documentation/)
   - [Flipkart Affiliate API](https://affiliate.flipkart.com/api-docs)
   - [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)

2. Add keys to `.env.local`

3. Restart the server

See [MARKETPLACE_INTEGRATION.md](./MARKETPLACE_INTEGRATION.md) for detailed setup instructions.

## 📚 Documentation

- [Redesign Notes](./REDESIGN_NOTES.md) - Complete redesign documentation
- [Marketplace Integration](./MARKETPLACE_INTEGRATION.md) - API setup guide

## 🧪 Testing

### With Mock Data (Current)
```bash
npm run dev
# Navigate to /dashboard/search
# Try searching: "iPhone", "Sony headphones", "Nike shoes", "Air fryer"
```

### Test AI Assistant
1. Click the chat button (bottom right)
2. Ask: "What's the best noise-cancelling headphone under ₹30,000?"
3. Get AI-powered recommendations

## 🎨 Design System

- **Primary Color**: Emerald (#10b981)
- **Typography**: Plus Jakarta Sans (body), Bricolage Grotesque (headings)
- **Border Radius**: 12px (rounded-xl), 16px (rounded-2xl)
- **Spacing**: Consistent 4px grid system
- **Animations**: Smooth transitions with Framer Motion

## 📱 Pages

### Landing Pages
- `/` - Home with hero, features, testimonials
- `/features` - Feature showcase
- `/how-it-works` - How Carta works
- `/about` - About the platform

### Dashboard Pages
- `/dashboard` - Overview with stats and recent activity
- `/dashboard/search` - AI-powered product search
- `/dashboard/comparison` - Side-by-side product comparison
- `/dashboard/history` - Search history
- `/dashboard/alerts` - Price alerts management
- `/dashboard/settings` - User settings and preferences

### Auth Pages
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
