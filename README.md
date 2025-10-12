# Personal Website - Senior Frontend Engineer

A production-grade personal website built with Next.js, TypeScript, and Tailwind CSS. Features internationalization (EN/IT/ES), a blog system, and optimized performance for global recruiters.

## 🚀 Features

- **Multi-language support**: English, Italian, and Spanish with next-intl
- **Blog system**: MDX-powered blog with reading time and tags
- **CV section**: Inline CV with experience timeline and skills grid
- **Dark/Light mode**: System-aware theme switching
- **SEO optimized**: Sitemap, robots.txt, OpenGraph, JSON-LD schema
- **Performance focused**: Lighthouse score ≥90, Core Web Vitals optimized
- **Accessibility**: WCAG 2.1 AA compliant
- **Type-safe**: Full TypeScript with strict mode
- **Modern stack**: Next.js 15, Tailwind CSS, shadcn/ui

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Content**: MDX with Contentlayer
- **Internationalization**: next-intl
- **Analytics**: Plausible (cookieless)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized routes
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # Robots.txt
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── header.tsx         # Main navigation
│   │   ├── theme-toggle.tsx   # Dark mode toggle
│   │   └── language-switcher.tsx
│   ├── lib/
│   │   ├── providers.tsx      # Theme provider
│   │   ├── seo.ts            # SEO utilities
│   │   └── utils.ts          # Utility functions
│   ├── i18n.ts               # Internationalization config
│   └── middleware.ts         # Locale routing
├── content/
│   └── posts/                # Blog posts (MDX)
├── messages/                 # Translation files
│   ├── en.json
│   ├── it.json
│   └── es.json
├── contentlayer.config.ts    # Content processing
└── next.config.ts           # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rgwebsite
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Adding Blog Posts

1. Create a new MDX file in `content/posts/` for each language:
```
content/posts/my-post.en.mdx
content/posts/my-post.it.mdx
content/posts/my-post.es.mdx
```

2. Add frontmatter to each file:
```yaml
---
title: "Your Post Title"
date: "2024-01-15"
summary: "Brief description of the post"
tags: ["Tag1", "Tag2"]
lang: "en"
---
```

3. Write your content in MDX format with full Markdown support and code syntax highlighting.

### Replacing the CV File

Replace the placeholder CV file at `/public/cv/cv-placeholder.pdf` with your actual CV. The download button will automatically serve your updated file.

### Updating CV Information

Edit the translation files in `messages/` to update your CV information:

- `messages/en.json` - English content
- `messages/it.json` - Italian content
- `messages/es.json` - Spanish content

Key sections to update:
- `hero.name` - Your name
- `hero.role` - Your job title
- `cv.summary.content` - About section
- `cv.experience.roles` - Work experience
- `cv.skills.categories` - Skills by category
- `contact.*` - Contact information

### Customizing Contact Information

Update these fields in all language files:
```json
{
  "contact": {
    "email": "your.email@example.com",
    "linkedin": "https://www.linkedin.com/in/your-handle",
    "github": "https://github.com/your-handle",
    "calendly": "https://calendly.com/your-handle/15min"
  }
}
```

## 🎨 Customization

### Colors and Branding

The site uses a minimal color palette with green and light blue accents. To customize:

1. Edit `src/app/globals.css` to change CSS custom properties
2. Update the primary colors in the `:root` and `.dark` sections
3. The current setup uses:
   - Primary: Green (`oklch(0.646 0.222 142.1)`)
   - Accent: Light blue (defined in chart colors)

### Adding New Languages

1. Add the locale to `src/middleware.ts`:
```typescript
const locales = ["en", "it", "es", "fr"]; // Add your locale
```

2. Create a new message file: `messages/fr.json`

3. Update the language switcher in `src/components/language-switcher.tsx`

## 📊 Analytics and Monitoring

### Required Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required for sitemap generation and SEO
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

### Plausible Analytics

Analytics will automatically be enabled when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set.

### Performance Monitoring

The site is optimized for:
- **LCP**: < 2.3s
- **CLS**: < 0.1
- **TTI**: < 2.5s
- **Lighthouse**: ≥90 on mobile

Monitor these metrics using:
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- WebPageTest

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com  # Optional
```
3. Deploy automatically on push to main branch
4. Contentlayer will automatically generate types during build
5. Sitemap will be generated after build via the `postbuild` script

### Other Platforms

The site generates a static export and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting provider

Build command: `npm run build`
Output directory: `.next` (or `out` for static export)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run tests

### Code Quality

The project includes:
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Vitest** - Unit testing

## 🎯 SEO Features

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Configured for search engines
- **Meta tags**: OpenGraph and Twitter cards
- **JSON-LD**: Structured data for rich snippets
- **Hreflang**: Multi-language SEO support
- **Canonical URLs**: Prevent duplicate content

## 🔒 Security

- **Content Security Policy**: Configured for XSS protection
- **HTTPS**: Enforced in production
- **Dependencies**: Regular security audits with `npm audit`

## 📱 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Progressive enhancement**: Graceful degradation for older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Contentlayer](https://contentlayer.dev/) - Content management
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization

---

**Note**: This is a template. Replace placeholder content with your actual information before deploying to production.
