# EmailAuto — Setup Guide (15 minutes)

## What This Tool Does
- Send REAL emails to clients via Resend API
- Track who opens your emails (tracking pixel)
- Retarget contacts who didn't open (1 click)
- Dashboard showing all stats

## Services Needed (All FREE)
| Service | Purpose | Cost |
|---------|---------|------|
| Resend.com | Send emails | Free (100/day) |
| Supabase | Store data | Free |
| Vercel | Host the app | Free |

---

## STEP 1: Setup Supabase (3 min)

1. Go to: https://supabase.com
2. Click "New project"
3. Name it: emailauto
4. Wait for it to provision (~1 min)
5. Go to: SQL Editor → New Query
6. Copy/paste contents of `supabase-schema.sql`
7. Click "Run"
8. Go to: Settings → API
9. Copy these values:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_SERVICE_ROLE_KEY)

---

## STEP 2: Setup Resend (3 min)

1. Go to: https://resend.com
2. Sign up (free)
3. Verify your email domain:
   - Go to: Domains → Add Domain
   - Add your domain (e.g. yourdomain.com)
   - Add DNS records they show you
   - OR use resend's test email (onboarding@resend.dev) for testing
4. Go to: API Keys → Create API Key
5. Copy the key (RESEND_API_KEY)

---

## STEP 3: Push to GitHub (2 min)

```bash
cd emailauto

git init
git add .
git commit -m "EmailAuto - client outreach tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/emailauto.git
git push -u origin main
```

---

## STEP 4: Deploy on Vercel (3 min)

1. Go to: https://vercel.com/new
2. Import your emailauto GitHub repo
3. Framework: Next.js (auto-detected)
4. DO NOT deploy yet — add env vars first:
   Click "Environment Variables" and add:

```
RESEND_API_KEY=re_xxxx
FROM_EMAIL=you@yourdomain.com
FROM_NAME=Your Name
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxx
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

5. Click "Deploy"
6. Wait 2 minutes
7. Update NEXT_PUBLIC_APP_URL with your actual Vercel URL
8. Redeploy

---

## STEP 5: Start Using It!

1. Visit your Vercel URL
2. Click "New Campaign"
3. Write your email template
4. Click "Upload CSV" and upload your contacts
5. Click "Send Campaign"
6. Watch opens appear in real-time
7. Click "Retarget Unopened" to follow up

---

## CSV Format

Your CSV file must have these columns:
```
email,name
john@shopify-store.com,John Smith
sarah@beautyco.io,Sarah Chen
```

---

## Troubleshooting

**Emails not sending:** Check RESEND_API_KEY and FROM_EMAIL in Vercel env vars
**Opens not tracking:** Check NEXT_PUBLIC_APP_URL is set to your actual domain
**Database errors:** Re-run the supabase-schema.sql script
**Build fails:** Check all env vars are set in Vercel

---

## Free Tier Limits

- Resend: 100 emails/day, 3,000/month
- Supabase: 500MB database, unlimited API calls
- Vercel: Unlimited deployments

For more volume, upgrade Resend ($20/month = 50,000 emails).
