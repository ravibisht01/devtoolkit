# DevToolkit — Next.js 14

A production-ready, SEO-optimized developer tools platform built with **Next.js 14 App Router**, TypeScript, Tailwind CSS, and Sharp for server-side image processing.

---

## 🚀 Tech Stack

| Layer        | Technology                                          |
|--------------|-----------------------------------------------------|
| Framework    | Next.js 14 (App Router, Server Components)         |
| Language     | TypeScript                                          |
| Styling      | Tailwind CSS v3                                     |
| Animations   | Framer Motion                                       |
| Icons        | Lucide React                                        |
| Code editor  | Monaco Editor                                       |
| Image processing | Sharp (server-side API routes)                  |
| File upload  | Native FormData + Next.js API route                 |
| QR codes     | qrcode (client-side canvas)                         |
| UUIDs        | uuid                                                |
| Deployment   | Vercel                                              |

---

## 📁 Project Structure

```
devtoolkit/
├── public/
│   ├── favicon.svg
│   ├── og-image.png          ← Replace with real 1200×630 OG image
│   └── uploads/              ← Runtime image outputs (auto-created)
│
└── src/
    ├── app/
    │   ├── layout.tsx         ← Root layout, fonts, Toaster
    │   ├── page.tsx           ← Homepage (Server Component + metadata)
    │   ├── not-found.tsx      ← 404 page
    │   ├── error.tsx          ← Global error boundary
    │   ├── loading.tsx        ← Global loading spinner
    │   ├── sitemap.ts         ← Dynamic XML sitemap
    │   ├── robots.ts          ← robots.txt
    │   │
    │   ├── tools/
    │   │   ├── layout.tsx     ← Tools layout with collapsible sidebar
    │   │   ├── page.tsx       ← /tools listing page
    │   │   ├── AllToolsClient.tsx
    │   │   └── [tool-slug]/
    │   │       ├── page.tsx       ← Server Component (metadata + layout)
    │   │       └── [Tool]Tool.tsx ← Client Component (interactive UI)
    │   │
    │   └── api/
    │       ├── health/route.ts
    │       ├── images/
    │       │   ├── compress/route.ts
    │       │   ├── convert/route.ts
    │       │   └── metadata/route.ts
    │       └── tools/
    │           └── sql-format/route.ts
    │
    ├── components/
    │   ├── common/
    │   │   ├── Breadcrumb.tsx
    │   │   ├── HomePageClient.tsx  ← Interactive homepage
    │   │   ├── ToolCard.tsx
    │   │   ├── ToolPageShell.tsx   ← Reusable tool wrapper
    │   │   └── ToolToolbar.tsx     ← Copy/download/share
    │   └── layout/
    │       ├── Navbar.tsx          ← Sticky nav + ⌘K search
    │       ├── Footer.tsx
    │       └── ToolsSidebar.tsx    ← Collapsible category sidebar
    │
    ├── constants/
    │   └── tools.ts           ← SINGLE SOURCE OF TRUTH for all 19 tools
    │
    ├── lib/
    │   ├── imageService.ts    ← Sharp compress/convert/metadata
    │   └── apiHelpers.ts      ← Rate limiting, form parsing, responses
    │
    ├── utils/
    │   └── cn.ts              ← clsx + tailwind-merge
    │
    └── styles/
        └── globals.css        ← Tailwind + custom component classes
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js >= 18
- npm >= 9

### 1. Clone & install

```bash
git clone https://github.com/yourname/devtoolkit.git
cd devtoolkit
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run

```bash
npm run dev
```

Open http://localhost:3000

---

## 🛠 API Routes

All API routes live inside `src/app/api/` — no separate backend needed.

| Method | Route                    | Description                   |
|--------|--------------------------|-------------------------------|
| GET    | /api/health              | Health check                  |
| POST   | /api/images/compress     | Compress image with Sharp     |
| POST   | /api/images/convert      | Convert image format          |
| POST   | /api/images/metadata     | Get image metadata            |
| POST   | /api/tools/sql-format    | Format SQL query              |

### Image Compress — POST /api/images/compress

**FormData fields:**
| Field   | Type   | Description                              |
|---------|--------|------------------------------------------|
| image   | File   | Image file (JPG/PNG/WebP/AVIF, max 10MB) |
| quality | number | 1–100, default 80                        |
| format  | string | jpeg\|png\|webp\|avif (optional)         |

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "/uploads/compressed_uuid.webp",
    "originalSize": 1048576,
    "compressedSize": 204800,
    "savingsPct": 80,
    "fileName": "compressed_uuid.webp"
  }
}
```

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo in the Vercel dashboard. The included `vercel.json` configures caching headers automatically.

**Environment variables to set in Vercel:**
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## ➕ Adding a New Tool

1. **Register it** in `src/constants/tools.ts` — add an entry to the `TOOLS` array
2. **Create the directory**: `src/app/tools/your-tool-slug/`
3. **Create `page.tsx`** (Server Component with `export const metadata`):
   ```tsx
   import { getToolById } from '@/constants/tools'
   import ToolPageShell from '@/components/common/ToolPageShell'
   import YourToolTool from './YourToolTool'

   const TOOL = getToolById('your-tool-slug')!

   export const metadata = {
     title: 'Your Tool Name',
     description: 'Your SEO description.',
   }

   export default function Page() {
     return <ToolPageShell tool={TOOL}><YourToolTool /></ToolPageShell>
   }
   ```
4. **Create `YourToolTool.tsx`** (Client Component with `'use client'`):
   ```tsx
   'use client'
   export default function YourToolTool() {
     return <div>Your tool UI here</div>
   }
   ```
5. Done — it auto-appears in sidebar, homepage, search, footer, and sitemap.

---

## 🔒 Security

- **Rate limiting** — in-memory per-IP (20 req/min for image routes, 60 req/min for text routes)
- **File validation** — MIME type check + 10 MB size limit
- **Auto file cleanup** — uploaded/processed images deleted after 5 minutes
- **Security headers** — set globally in `next.config.mjs`
- **No secrets in client** — Sharp + file I/O run only in Node.js API routes

---

## 📈 SEO Architecture

- **Server Components** — every tool page is a Server Component with `export const metadata`
- **Dynamic sitemap** — `/sitemap.xml` auto-generated from `TOOLS` array
- **Dynamic robots.txt** — `/robots.txt` via Next.js route
- **Structured data** — WebSite + SearchAction schema on homepage
- **Canonical URLs** — set per page in metadata
- **OG + Twitter cards** — configured in root layout + per-page metadata
- **Clean URLs** — `/tools/json-formatter`, `/tools/regex-tester` (no query params)

---

## 🗺 Roadmap

- [ ] `@vercel/og` — dynamic OG image generation per tool
- [ ] User accounts + tool history (NextAuth + MongoDB)
- [ ] Premium subscriptions (Stripe)
- [ ] AI-powered tools (Anthropic API)
- [ ] PWA / service worker for offline use
- [ ] More tools: YAML↔JSON, CSV viewer, Color palette generator
- [ ] Admin dashboard (tool analytics, SEO management)
- [ ] i18n (multi-language support)

---

## 📄 License

MIT
