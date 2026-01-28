# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MESO is a landing page for a Japanese ramen restaurant/franchise. It's a React + TypeScript + Vite application with a cyberpunk/futuristic aesthetic and Polish/English internationalization support.

## Commands

```bash
# All commands run from the /app directory
cd app

npm run dev      # Start development server
npm run build    # TypeScript check + Vite build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Entry Point and Routing
- `src/main.tsx` - React entry point
- `src/App.tsx` - Root component with simple pathname-based routing (main page vs `/franchise`)

### Internationalization
The app supports Polish (default) and English:
- `src/context/LanguageContext.tsx` - React context providing `language`, `setLanguage`, `toggleLanguage`, and `t` (translations object)
- `src/data/translations.ts` - All UI text in `translations.pl` and `translations.en` objects
- Components access translations via `const { t } = useLanguage()` hook

### Page Structure
Main landing page sections in `src/sections/`:
- `Navigation.tsx` - Fixed header with language switcher
- `Hero.tsx` - Full-screen hero with GSAP animations
- `About.tsx`, `Menu.tsx`, `Location.tsx`, `Team.tsx`, `CTA.tsx`, `Footer.tsx`

Standalone pages in `src/pages/`:
- `Franchise.tsx` - Franchise information page

### Animation
GSAP with ScrollTrigger handles all animations. The pattern used throughout:
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations here
  }, containerRef);
  return () => ctx.revert();
}, []);
```

### UI Components
shadcn/ui (New York style) components in `src/components/ui/`. Uses:
- Radix UI primitives
- Tailwind CSS with CSS variables for theming
- `class-variance-authority` for component variants
- `@/lib/utils.ts` exports `cn()` for class merging

### Path Aliases
`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

### Styling
- Tailwind CSS with custom theme extensions in `tailwind.config.js`
- CSS variables for colors defined in `src/index.css`
- Dark background (#050505) with neon accent colors (#2400FF blue, #EB00FF pink, #00FF9D green)
- Custom fonts: Orbitron (headers), Rajdhani (subtitles), Noto Sans JP (Japanese text)
