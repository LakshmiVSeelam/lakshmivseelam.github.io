# 🚀 Deployment Guide - Lakshmi's AI Portfolio

## Quick Start (5 minutes)

### Prerequisites

- GitHub account
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

---

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Connect GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository: `lakshmivseelam.github.io`

### Step 2: Configure Project

1. **Project Name:** `lakshmi-portfolio` (or your choice)
2. **Framework Preset:** Other
3. **Root Directory:** `./`
4. **Build Command:** (leave empty)
5. **Output Directory:** `./`

### Step 3: Add Environment Variable

1. In **Environment Variables** section, click **"Add"**
2. **Name:** `OPENAI_API_KEY`
3. **Value:** Your OpenAI API key (starts with `sk-`)
4. **Environment:** Production, Preview, Development (select all)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site is live! 🎉

**Your URLs:**

- Main site: `https://lakshmi-portfolio.vercel.app`
- API endpoints: `https://lakshmi-portfolio.vercel.app/api/chat`

---

## Method 2: Deploy via CLI (Developers)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy

```bash
cd /home/lakshmi.seelam/Desktop/portfolio/lakshmivseelam.github.io

# First deployment (test)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? lakshmi-portfolio
# - Directory? ./
# - Override settings? No
```

### Step 4: Add Environment Variable

```bash
vercel env add OPENAI_API_KEY
# Paste your OpenAI API key
# Select: Production, Preview, Development
```

### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## Method 3: GitHub Actions (Auto-Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main, dev-ai]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

## 🧪 Testing Your Deployment

### Test API Endpoints

Visit: `https://your-site.vercel.app/api-test.html`

Or use curl:

```bash
# Test Chat API
curl -X POST https://your-site.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Lakshmi!"}'

# Test Code Explainer
curl -X POST https://your-site.vercel.app/api/explain-code \
  -H "Content-Type: application/json" \
  -d '{"code": "const x = 42;", "language": "javascript"}'

# Test Story Generator
curl -X POST https://your-site.vercel.app/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{"chapterId": "startup"}'
```

---

## 🔒 Security Checklist

- [ ] ✅ OPENAI_API_KEY added to Vercel (not in code)
- [ ] ✅ `.env.local` in `.gitignore`
- [ ] ✅ Never commit API keys to Git
- [ ] ✅ Rate limiting enabled (in `utils.ts`)
- [ ] ⚠️ Update CORS origin in `utils.ts` for production:
  ```typescript
  'Access-Control-Allow-Origin': 'https://your-domain.com'
  ```

---

## 💰 Cost Management

### Free Tier Limits (Vercel Hobby)

- ✅ 100 GB bandwidth
- ✅ 100 serverless function executions per day
- ✅ Unlimited static files

### OpenAI API Costs

- GPT-3.5-turbo: ~$0.002 per conversation
- **Expected:** $2-5/month for portfolio traffic
- Set spending limits in OpenAI dashboard

---

## 🐛 Troubleshooting

### Issue: "Missing OPENAI_API_KEY"

**Fix:**

```bash
vercel env add OPENAI_API_KEY
# Enter your key
# Redeploy: vercel --prod
```

### Issue: API returns 404

**Check:**

1. Files in `/api` folder have `.ts` extension
2. `vercel.json` exists in root
3. Redeploy after adding files

### Issue: CORS errors

**Fix:** Update `utils.ts`:

```typescript
'Access-Control-Allow-Origin': '*' // For testing
// Change to your domain for production
```

### Issue: Rate limit too strict

**Fix:** Adjust in `utils.ts`:

```typescript
checkRateLimit(clientIp, 20, 60000); // 20 requests per minute
```

---

## 📊 Monitoring

### View Logs

```bash
vercel logs <deployment-url>
```

### Analytics

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Click **Analytics** tab
4. See traffic, performance, errors

---

## 🔄 Updates & Redeployment

### Auto-Deploy (Recommended)

Vercel auto-deploys on every Git push:

```bash
git add .
git commit -m "Update portfolio"
git push origin dev-ai
```

Vercel automatically:

1. Detects changes
2. Builds project
3. Deploys to preview URL
4. Shows deployment status

### Manual Deploy

```bash
vercel --prod
```

---

## 🎯 Custom Domain (Optional)

### Add Your Domain

1. Go to Vercel project settings
2. Click **Domains**
3. Add: `lakshmi-seelam.com`
4. Update DNS:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `cname.vercel-dns.com`

---

## 📱 Next Steps

After deployment:

1. ✅ Test all API endpoints
2. ✅ Update contact info in `index.html`
3. ✅ Add Google Analytics (optional)
4. ✅ Share your portfolio URL!
5. ✅ Monitor OpenAI API usage

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **OpenAI API:** https://platform.openai.com/docs
- **Contact:** lakshmivseelam@gmail.com

---

## ✨ You're All Set!

Your AI-powered portfolio is now live! 🎉

**Share it:**

- LinkedIn
- GitHub profile
- Job applications
- Twitter/X

**Your deployed URLs:**

- Main: `https://your-project.vercel.app`
- Test page: `https://your-project.vercel.app/api-test.html`
- Chat API: `https://your-project.vercel.app/api/chat`

---

Built with ❤️ using Vercel + OpenAI
