# Carlos Duplar Mello - Portfolio Website

A modern, multilingual portfolio website showcasing professional experience, expertise, and projects. Built with cutting-edge web technologies for optimal performance and accessibility.

🌐 **Live Site:** [carlosmello.work](https://carlosmello.work)

![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

## 🚀 Tech Stack

### Core Framework
- **Vite** - Next-generation frontend tooling
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing

### UI & Styling
- **shadcn/ui** - High-quality React components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Tailwind Animate** - Animation utilities

### Internationalization
- **i18next** - i18n framework
- **react-i18next** - React bindings for i18next
- **i18next-browser-languagedetector** - Automatic language detection

### Additional Tools
- **EmailJS** - Contact form email service
- **Sonner** - Toast notifications library
- **Puppeteer** - Headless browser for prerendering

## ✨ Features

- **🌍 Multilingual Support** - Full internationalization in 5 languages:
  - English
  - Portuguese
  - French
  - German
  - Spanish

- **🔍 Automatic Language Detection** - Detects user's preferred language from browser settings with fallback to localStorage preferences

- **📱 Fully Responsive** - Mobile-first design optimized for all screen sizes

- **🦊 Firefox Android Compatible** - Uses legacy polyfills for broader browser support

- **📧 Contact Form** - Integrated with EmailJS for direct communication

- **♿ Accessible** - Built with accessibility in mind using Radix UI primitives

- **⚡ Performance Optimized** - Fast loading times with Vite's build optimizations

- **🔍 SEO Optimized** - robots.txt and sitemap.xml configured for search engine crawling

- **📊 Analytics Ready** - Google Analytics integration for visitor tracking and insights

- **⚡ Pre-rendered for Crawlers** - SEO-friendly static HTML available for search engine bots

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **npm** (comes with Node.js)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/carlosduplar/cduplar-ai-nexus.git

# Navigate to project directory
cd cduplar-ai-nexus

# Install dependencies
npm install
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Build without Prerendering

For faster builds during development:

```bash
npm run build:no-prerender
```

## 👀 Preview

Preview the production build locally:

```bash
npm run preview
```

## 🧪 Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
cduplar-ai-nexus/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AboutSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ConsentBanner.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ExpertiseSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── Navigation.tsx
│   │   └── ProjectsSection.tsx
│   ├── i18n/               # Internationalization
│   │   ├── locales/        # Translation files (en, pt, fr, de, es)
│   │   └── index.ts        # i18n configuration
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main landing page
│   │   └── NotFound.tsx    # 404 page
│   ├── hooks/              # Custom React hooks
│   │   └── use-toast.ts    # Toast notification hook
│   ├── lib/                # Utility functions
│   ├── utils/              # Helper utilities
│   │   └── consent.ts      # Google Analytics consent management
│   ├── assets/             # Static assets (images, logos)
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Application entry point
├── scripts/                # Build and automation scripts
│   └── prerender.mjs       # Puppeteer-based prerendering
├── public/                 # Static assets
├── dist/                   # Production build output
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # shadcn/ui configuration
└── package.json            # Project dependencies
```

## ⚙️ Configuration

### Vite Configuration (`vite.config.ts`)
- React SWC plugin for faster builds
- Legacy plugin for Firefox Android compatibility
- Path aliases (`@/` → `./src/`)
- Custom asset output structure
- Server configuration (port 8080, IPv6 support)

### Internationalization (`src/i18n/index.ts`)
- Language detection order: localStorage → browser language → fallback
- Automatic locale code conversion (e.g., `pt-BR` → `pt`)
- Dynamic HTML `lang` attribute updates
- Persistent language preference in localStorage

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color palette with CSS variables
- Extended theme with sidebar support
- Custom animations (accordion)
- Inter font family integration

### shadcn/ui Configuration (`components.json`)
- Path aliases for components (`@/components/ui`)
- Tailwind CSS integration
- Component variant management with CVA

## 🌐 Browser Support

- **Modern Browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile:** iOS Safari, Chrome Android, Firefox Android
- **Legacy Support:** Firefox ESR and older Android browsers via polyfills

## 🔍 SEO & Analytics

### Search Engine Optimization
- **robots.txt** - Crawler directives configured in `public/robots.txt`
- **sitemap.xml** - Auto-generated sitemap available at `/sitemap.xml`
- **Pre-rendering** - Static HTML generation for improved indexability
- **Meta Tags** - Dynamic meta tags for each page using react-helmet-async

### Analytics
- **Google Analytics** - Tracking configured with GA4 measurement ID
- **Performance Monitoring** - Page load and user interaction tracking

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `vite` | Build tool |
| `typescript` | Type safety |
| `tailwindcss` | Styling |
| `i18next` | Internationalization |
| `react-router-dom` | Routing |
| `@radix-ui/*` | Accessible UI primitives |
| `@vitejs/plugin-legacy` | Legacy browser support |
| `puppeteer` | Headless browser for prerendering |
| `@emailjs/browser` | Email service for contact form |
| `sonner` | Toast notifications |
| `flag-icons` | Country flag icons |
| `class-variance-authority` | Component variant management |
| `clsx` & `tailwind-merge` | Utility for className management |

## 🚢 Deployment

This site is deployed as a static site in Firebase Hosting. The build output in `dist/` can be hosted on:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

Build command: `npm run build`
Output directory: `dist`

## 📝 Environment Variables

No environment variables are required for basic operation. For EmailJS integration in the contact form, configure the service directly in the component or add appropriate credentials.

## 📄 License

This project is private and not licensed for public use.

## 👤 Contact

**Carlos Duplar Mello**

- 🌐 Website: [carlosmello.work](https://carlosmello.work)
- 💼 LinkedIn: [linkedin.com/in/carlosduplar](https://linkedin.com/in/carlosduplar)

---

**Built with modern AI-powered development tools:**
- 🎨 [Lovable](https://lovable.dev) - AI-powered UI generation
- 🤖 [Claude Code](https://www.anthropic.com) - AI code assistance  
- 💎 [Gemini CLI](https://ai.google.dev) - Command-line AI tooling

*Showcasing practical AI tool integration in professional workflows*