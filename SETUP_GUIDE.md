# EmailAuto - Complete Setup Guide

## 🎯 What This Does
- **Send bulk emails** to client lists with personalization
- **Track opens** with tracking pixels
- **Retarget unopened** emails with follow-ups
- **Beautiful dashboard** to monitor campaigns

## 🚀 Quick Start (20 minutes)

### Step 1: Setup Supabase (Free Database)

1. Go to **https://supabase.com**
2. Sign up (free)
3. Click "New Project"
4. Name it: `emailauto`
5. Wait ~1 minute for provisioning
6. Go to **SQL Editor** → **New Query**
7. Run this SQL:

```sql
-- Create campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP,
  opened BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_contacts_campaign ON contacts(campaign_id);
CREATE INDEX idx_contacts_email ON contacts(email);
```

8. Copy your credentials from **Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service_role key)

### Step 2: Setup Resend (Free Email Service)

1. Go to **https://resend.com**
2. Sign up (free - 100 emails/day)
3. Go to **API Keys** → Create API Key
4. Copy your `RESEND_API_KEY`
5. Go to **Domains**:
   - Option A: Add your own domain + follow DNS setup
   - Option B: Use test email `onboarding@resend.dev` for testing

### Step 3: Local Setup

```bash
# 1. Create project folder
mkdir emailauto
cd emailauto

# 2. Initialize git
git init

# 3. Copy ALL files from this setup into your folder
# Make sure you have:
# - app/ (with layout.tsx, page.tsx, api/send/route.ts, api/track/route.ts)
# - lib/ (with supabase.ts)
# - public/ (empty is fine)
# - package.json, next.config.js, tailwind.config.js, etc.

# 4. Install dependencies
npm install

# 5. Create .env.local with your credentials
cat > .env.local << EOF
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your Company
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# 6. Test locally
npm run dev
# Visit http://localhost:3000
```

### Step 4: Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "EmailAuto - Client outreach tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/emailauto.git
git push -u origin main
```

2. Go to **https://vercel.com/new**
3. Import your GitHub repo
4. Framework auto-detects as **Next.js** ✓
5. Before deploying, add **Environment Variables**:
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `FROM_NAME`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app` (your actual Vercel URL)

6. Click **Deploy**
7. Wait 2-3 minutes
8. Visit your Vercel URL

## 📧 How to Use

### Create a Campaign
1. Click **+ New Campaign**
2. Enter campaign name (e.g., "Q2 Outreach")
3. Write email subject
4. Write email body (use `{{name}}` for personalization)
5. Upload CSV with contacts
6. Click **Create Campaign**

### CSV Format
Your file must have columns: `email,name`

```
email,name
john@company.com,John
sarah@company.com,Sarah
```

### Send Campaign
1. Click **Send** on your campaign
2. Emails are sent immediately
3. Opens are tracked in real-time
4. Dashboard updates as people open

## 🔧 File Structure

```
emailauto/
├── app/
│   ├── layout.tsx          # Main layout
│   ├── page.tsx            # Dashboard UI
│   └── api/
│       ├── send/
│       │   └── route.ts    # Send emails endpoint
│       └── track/
│           └── route.ts    # Email open tracking
├── lib/
│   └── supabase.ts         # Database client
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
└── .env.example
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check all env vars are set in Vercel |
| Emails not sending | Verify RESEND_API_KEY and FROM_EMAIL |
| Opens not tracked | Check NEXT_PUBLIC_APP_URL is correct |
| Database errors | Re-run SQL schema in Supabase |
| CSV upload fails | Ensure columns are exactly: `email,name` |

## 📊 Free Tier Limits

- **Resend**: 100 emails/day, 3,000/month (upgrade to $20/mo for 50,000)
- **Supabase**: 500MB database, unlimited API calls
- **Vercel**: Unlimited deployments

## ✅ Verify Setup

Test your setup:
```bash
# 1. Can you log in to dashboard? ✓
# 2. Can you create a campaign? ✓
# 3. Can you upload a CSV? ✓
# 4. Do emails send when you click Send? ✓
# 5. Do opens track in real-time? ✓
```

## 📧 Next Steps

After deployment:
1. Send test emails to yourself
2. Click the email to verify it opens
3. Check dashboard for tracking
4. Upload real client list
5. Launch campaigns!

## 💡 Pro Tips

- **Personalization**: Use `{{name}}` in email body to insert contact names
- **Timing**: Send campaigns early morning (8-10 AM) for best open rates
- **Follow-up**: Wait 3 days, then retarget unopened emails
- **A/B Test**: Create two campaigns with different subjects to compare
- **Warm up**: Start with small lists (20-50) before scaling

## 🎁 Premium Features (Coming Soon)

- Email templates library
- A/B testing
- Advanced analytics
- Drip campaigns
- Webhook integrations

---

**Questions?** Check Resend docs (resend.com/docs) or Supabase docs (supabase.com/docs)
