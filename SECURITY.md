# 🔐 Security & Authentication Guide

Protect your Expnse app from unauthorized access.

## ✅ Simple Password Protection (Now Implemented!)

A basic password authentication has been added to your app. Here's how it works:

### How to Set Your Password

1. **Open the file:** `components/AuthWrapper.tsx`

2. **Find this line:**
   ```typescript
   const CORRECT_PASSWORD = 'your-secret-password-here';
   ```

3. **Change it to your password:**
   ```typescript
   const CORRECT_PASSWORD = 'MySecurePassword123!';
   ```

4. **Save the file** - The app will reload automatically

### How It Works

- ✅ Password prompt on first access
- ✅ Session stays active while browser is open
- ✅ Password required after closing browser
- ✅ No data sent to any server
- ✅ Works on any device

### Security Level: Basic

⚠️ **Important Notes:**
- Password is stored in code (visible to anyone who can view source)
- Good for: Personal use, keeping casual snoopers out
- Not good for: Highly sensitive data, enterprise use

## 🔒 More Secure Options

### Option 2: Deploy to Vercel with Authentication

Vercel offers built-in authentication:

1. **Deploy to Vercel** (as per DEPLOYMENT.md)

2. **Add Vercel Authentication:**
   - Go to your project settings on Vercel
   - Navigate to "Deployment Protection"
   - Enable "Password Protection"
   - Set a password
   - Save changes

This adds server-side protection that's much more secure!

### Option 3: Use NextAuth.js (Most Secure)

For proper user authentication with email/password or OAuth:

```bash
npm install next-auth
```

Then follow the [NextAuth.js documentation](https://next-auth.js.org/) to set up:
- Email/password authentication
- Google Sign-In
- GitHub authentication
- Multi-user support

### Option 4: Restrict by IP Address

On Vercel:
1. Go to project settings
2. "Deployment Protection"
3. "IP Allowlist"
4. Add allowed IP addresses

Perfect for business/office use where you have static IPs.

## 🛡️ Current Protection Features

Your app now has:
- ✅ Password login screen
- ✅ Session persistence (stays logged in during browser session)
- ✅ Auto-logout on browser close
- ✅ Clean, professional login UI
- ✅ Error handling for wrong passwords

## 🔑 Password Best Practices

1. **Use a strong password:**
   - At least 12 characters
   - Mix of letters, numbers, symbols
   - Not a common word or phrase

2. **Change regularly:**
   - Update password every few months
   - Change immediately if compromised

3. **Don't share:**
   - Keep your password private
   - Use different passwords for different apps

## 📱 Accessing on Multiple Devices

With the current setup:
- Each device needs to enter the password
- Password stays active during the browser session
- Close browser = need to login again

## 🚀 Deployment Considerations

### When deploying to Vercel:

**Option A: Keep code-based password**
- Simple, works immediately
- Anyone with code access can see password
- Good for personal projects

**Option B: Use environment variables**
1. Create `.env.local`:
   ```
   NEXT_PUBLIC_APP_PASSWORD=your-password-here
   ```

2. Update AuthWrapper.tsx:
   ```typescript
   const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD || 'default';
   ```

3. Add to Vercel:
   - Project Settings → Environment Variables
   - Add NEXT_PUBLIC_APP_PASSWORD
   - Redeploy

## 🔐 Additional Security Tips

1. **Use HTTPS** (automatic on Vercel)
2. **Regular backups** (export CSV regularly)
3. **Keep dependencies updated** (`npm update`)
4. **Don't commit passwords** to Git
5. **Use .env files** for sensitive data

## 🆘 Troubleshooting

### Forgot Password?
1. Open `components/AuthWrapper.tsx`
2. View or change the CORRECT_PASSWORD value
3. Save and refresh

### Locked Out?
1. Clear browser storage:
   - Open DevTools (F12)
   - Application → Storage → Clear Site Data
2. Or use incognito mode

### Password Not Working?
1. Check for typos in AuthWrapper.tsx
2. Password is case-sensitive
3. Clear browser cache and try again

## 📊 Security Comparison

| Method | Security Level | Ease of Setup | Cost |
|--------|---------------|---------------|------|
| Code Password | Basic | Easy | Free |
| Vercel Protection | Medium | Easy | Free |
| NextAuth.js | High | Medium | Free |
| IP Allowlist | High | Easy | Free* |

*Some features require Vercel Pro plan

## ✅ What's Next?

1. **Set your password** in AuthWrapper.tsx
2. **Test it** - refresh browser and try logging in
3. **Deploy to Vercel** for additional protection
4. **Enable Vercel's Deployment Protection** for extra security

Your Expnse app is now protected! 🔒✨
