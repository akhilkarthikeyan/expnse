# Deployment Guide - Expnse

Complete guide to deploy your Expnse expense tracker to Vercel.

## Prerequisites

✅ Git installed on your machine  
✅ GitHub account  
✅ Vercel account (free tier is sufficient)  
✅ Node.js 18+ installed locally

## Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Easiest)

#### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Expnse expense tracker"

# Create a new repository on GitHub (via web interface)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/expnse.git
git branch -M main
git push -u origin main
```

#### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login" (use GitHub for easy integration)
3. Click "Add New Project"
4. Click "Import Git Repository"
5. Select your `expnse` repository
6. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
7. Click "Deploy"
8. Wait 2-3 minutes for deployment to complete
9. Your app is live! 🎉

#### 3. Access Your Live App

Vercel will provide you with a URL like:
```
https://expnse-xxxxx.vercel.app
```

### Method 2: Deploy via Vercel CLI

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Deploy

```bash
# From your project root directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? expnse
# - In which directory is your code located? ./
# - Want to override settings? No
```

#### 4. Production Deployment

```bash
# Deploy to production
vercel --prod
```

## Environment Variables

Expnse doesn't require any environment variables as it uses browser LocalStorage. However, if you extend the app to use external APIs, you can add them:

1. Go to your project on Vercel dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add your variables
4. Redeploy

## Custom Domain Setup

### 1. Add Domain on Vercel

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Enter your domain name (e.g., `expnse.com`)
4. Click "Add"

### 2. Configure DNS

Add these records to your domain provider:

**For root domain (expnse.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Wait for DNS Propagation

DNS changes can take 24-48 hours to propagate globally, but usually complete within a few hours.

## Continuous Deployment

Once connected to GitHub, every push to your main branch automatically triggers a new deployment:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys the changes!
```

## Monitoring & Analytics

### Built-in Analytics

Vercel provides free analytics:
1. Go to your project dashboard
2. Click "Analytics" tab
3. View visitor stats, performance metrics, and more

### Performance Monitoring

Check your deployment performance:
1. Go to "Deployments" tab
2. Click on any deployment
3. View build logs and performance scores

## Troubleshooting

### Build Fails

**Issue**: Build errors during deployment

**Solution**:
```bash
# Test build locally first
npm run build

# If it builds locally, check:
# 1. Node version compatibility
# 2. Missing dependencies in package.json
# 3. Environment variables (if any)
```

### 404 Errors

**Issue**: Pages not found after deployment

**Solution**: Next.js App Router should handle this automatically. Check:
- Files are in the `app/` directory
- File names are correct (`page.tsx`, not `Page.tsx`)

### TypeScript Errors

**Issue**: Type errors during build

**Solution**:
```bash
# Run type check locally
npm run build

# Fix all TypeScript errors before deploying
```

## Updating Your Deployment

### Quick Updates

```bash
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Update feature X"
git push origin main

# Vercel auto-deploys!
```

### Rollback

If something goes wrong:
1. Go to "Deployments" on Vercel dashboard
2. Find a previous working deployment
3. Click "..." → "Promote to Production"

## Performance Optimization

Your app is already optimized with:
- ✅ Next.js 14 App Router
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Static generation where possible
- ✅ Tailwind CSS purging unused styles

## Cost Considerations

**Vercel Free Tier includes:**
- Unlimited deployments
- 100GB bandwidth per month
- Automatic HTTPS
- Custom domains
- Web Analytics

For most personal expense trackers, the free tier is more than sufficient!

## Security Best Practices

1. **Data Privacy**: All data stored in browser LocalStorage
2. **HTTPS**: Enabled by default on Vercel
3. **No Backend**: No server means no server vulnerabilities
4. **No API Keys**: App doesn't require any external services

## Next Steps

After deployment:
1. ✅ Test all features on live URL
2. ✅ Share with friends and family
3. ✅ Set up custom domain (optional)
4. ✅ Monitor analytics
5. ✅ Gather feedback and iterate

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Expnse Issues**: https://github.com/akhilkarthikeyan/expnse/issues

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Deployment successful
- [ ] Live URL accessible
- [ ] All features working
- [ ] Custom domain configured (optional)
- [ ] Continuous deployment set up

Congratulations! Your Expnse app is now live! 🚀✨
