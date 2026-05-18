# 🚀 EmailAuto - Quick Deployment (5 Steps)

## Before You Start
Make sure you have:
- GitHub account
- Vercel account  
- Supabase account
- Resend account

---

## Step 1: Create Supabase Database (3 min)

1. Go to **https://supabase.com** → Sign up
2. Click **New Project**
3. Name: `emailauto` → Create
4. Wait for provisioning (~1 min)
5. Go to **SQL Editor** → New Query
6. Paste this SQL and click **Run**:

```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  email TEXT NOT NULL,
  name TEXT,
  sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP,
  opened BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMP
);

CREATE INDEX idx_contacts_campaign ON contacts(campaign_id);
```

7. Go to **Settings → API**
8. Copy these values to save for later:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2: Setup Resend Email Service (2 min)

1. Go to **https://resend.com** → Sign up (FREE)
2. Go to **API Keys** → Click **Create API Key**
3. Copy the key → `RESEND_API_KEY`
4. For testing, you can use: **onboarding@resend.dev**
5. (Optional) Add your domain in **Domains** tab for custom emails

---

## Step 3: Create GitHub Repo (2 min)

1. Go to **https://github.com/new**
2. Name: `emailauto`
3. Check **Add .gitignore (select Node)**
4. Click **Create repository**
5. You'll get a URL like: `https://github.com/YOUR_USERNAME/emailauto.git`

---

## Step 4: Push Code to GitHub (3 min)

From your computer:

```bash
# Navigate to your project folder
cd emailauto

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "EmailAuto - Client outreach tool"

# Rename branch to main
git branch -M main

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/emailauto.git

# Push to GitHub
git push -u origin main
```

---

## Step 5: Deploy on Vercel (3 min)

1. Go to **https://vercel.com/new**
2. Click **Continue with GitHub**
3. Find and select **emailauto** repository
4. Click **Import**
5. **Important**: Before clicking Deploy, add Environment Variables:

   Click **Environment Variables** and add these (10 total):

   | Key | Value |
   |-----|-------|
   | `RESEND_API_KEY` | `re_xxxxx` (from Resend) |
   | `FROM_EMAIL` | `noreply@yourdomain.com` |
   | `FROM_NAME` | `Your Company Name` |
   | `NEXT_PUBLIC_SUPABASE_URL` | (from Supabase API settings) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase API settings) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase API settings) |
   | `NEXT_PUBLIC_APP_URL` | `https://emailauto-xyz.vercel.app` |

   *(For NEXT_PUBLIC_APP_URL, you'll see your Vercel URL after first deploy)*

6. Click **Deploy**
7. Wait 2-3 minutes ⏳
8. Click **Visit** when ready

---

## 🎉 It's Live!

Your EmailAuto app is now deployed! Visit your Vercel URL to:
- Create campaigns
- Upload contact lists (CSV)
- Send emails
- Track opens in real-time

---

## 📋 CSV Format for Contacts

Your contact CSV must have these exact columns:

```
email,name
john@company.com,John
sarah@company.com,Sarah
mike@company.com,Mike
```

Download as `.csv` file before uploading.

---

## ❌ If Build Fails

If you see "npm run build exited with 1":

1. **Check all environment variables** are set in Vercel
2. **Verify file structure**:
   - app/layout.tsx ✓
   - app/page.tsx ✓
   - app/api/send/route.ts ✓
   - app/api/track/route.ts ✓
   - lib/supabase.ts ✓
   - package.json ✓

3. **Check package.json** has all dependencies:
   - next, react, react-dom, @supabase/supabase-js, resend

4. **Redeploy** from Vercel dashboard (sometimes fixes caching issues)

---

## 📊 Free Tier Limits

- **Resend**: 100 emails/day (3,000/month)
- **Supabase**: 500MB database
- **Vercel**: Unlimited

For bigger volumes, upgrade services ($20-50/month).

---

## 🆘 Still Having Issues?

- Resend docs: https://resend.com/docs
- Supabase docs: https://supabase.com/docs
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs

Good luck! 🚀
