# EmailAuto - Complete File Structure

Create this exact folder structure in your project:

```
emailauto/
│
├── app/
│   ├── layout.tsx              # Main app layout (from layout.tsx)
│   ├── page.tsx                # Dashboard page (from page.tsx)
│   ├── globals.css             # Tailwind styles (from globals.css)
│   │
│   └── api/
│       ├── send/
│       │   └── route.ts        # Email sending endpoint (from send-route.ts)
│       │
│       └── track/
│           └── route.ts        # Email tracking endpoint (from track-route.ts)
│
├── lib/
│   └── supabase.ts             # Database client (from supabase.ts)
│
├── public/                      # Static files (can be empty)
│
├── .env.example                # Environment template
├── .gitignore                  # Git ignore patterns
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
│
└── README.md                   # Project info

```

## 📝 How to Set Up Locally

### 1. Create Project Folder
```bash
mkdir emailauto
cd emailauto
git init
```

### 2. Create Folder Structure
```bash
mkdir -p app/api/send app/api/track lib public
```

### 3. Copy Files
From the files provided, place them in the correct locations:

**In `app/`:**
- `layout.tsx` → Copy content from layout.tsx
- `page.tsx` → Copy content from page.tsx  
- `globals.css` → Copy content from globals.css

**In `app/api/send/`:**
- `route.ts` → Copy content from send-route.ts (rename to route.ts)

**In `app/api/track/`:**
- `route.ts` → Copy content from track-route.ts (rename to route.ts)

**In `lib/`:**
- `supabase.ts` → Copy content from supabase.ts

**In root folder:**
- `package.json` → Copy from package.json
- `tsconfig.json` → Copy from tsconfig.json
- `next.config.js` → Copy from next.config.js
- `tailwind.config.js` → Copy from tailwind.config.js
- `postcss.config.js` → Copy from postcss.config.js
- `.env.example` → Copy from .env.example
- `.gitignore` → Copy from .gitignore

### 4. Install Dependencies
```bash
npm install
```

### 5. Create .env.local
```bash
cp .env.example .env.local
# Edit .env.local with your actual credentials
```

### 6. Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

### 7. Deploy to Vercel
```bash
git add .
git commit -m "EmailAuto - Client outreach"
git remote add origin https://github.com/YOUR_USERNAME/emailauto.git
git push -u origin main
```

Then import on Vercel.com and add environment variables.

## ✅ File Checklist

Before deploying, verify you have:

- [ ] app/layout.tsx
- [ ] app/page.tsx
- [ ] app/globals.css
- [ ] app/api/send/route.ts
- [ ] app/api/track/route.ts
- [ ] lib/supabase.ts
- [ ] package.json
- [ ] tsconfig.json
- [ ] next.config.js
- [ ] tailwind.config.js
- [ ] postcss.config.js
- [ ] .env.example
- [ ] .gitignore

If all are present, your project should build successfully! ✓
