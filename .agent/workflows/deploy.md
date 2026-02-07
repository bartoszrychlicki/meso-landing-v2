---
description: Deploy MESO landing page to Cloudflare Pages
---

# Deploy to Cloudflare Pages

## Prerequisites
- Wrangler CLI installed (`npm install -g wrangler`)
- Logged into Cloudflare (`wrangler login`)

## Steps

1. Navigate to the app directory
```bash
cd /Users/bartoszrychlicki/Development/_Websites/meso-landing-v2/app
```

// turbo
2. Build and deploy to Cloudflare Pages
```bash
npm run build && npx wrangler pages deploy dist --project-name=meso-landing-v2
```

## Project Details
- **Cloudflare Project Name**: `meso-landing-v2`
- **Production Branch**: `main`
- **Build Output Directory**: `dist`
- **Production URL**: https://meso-landing-v2.pages.dev

## Notes
- The build command runs TypeScript compilation and Vite build
- Wrangler will upload only changed files (cached uploads)
