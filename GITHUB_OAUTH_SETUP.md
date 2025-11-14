# GitHub OAuth Setup Instructions

## ✅ Configuration Completed

Your portfolio now uses **GitHub Issues** for all content (blogs & notes) instead of Supabase!

### 🔧 GitHub OAuth App Settings

**Update your GitHub OAuth App settings:**

1. Go to: https://github.com/settings/developers
2. Click on "arien.dev" OAuth App
3. Update these fields:

#### For Development (localhost):
- **Homepage URL**: `http://localhost:8080/`
- **Authorization callback URL**: `http://localhost:8080/github-callback`

#### For Production (when deployed):
- **Homepage URL**: `https://your-domain.com/`
- **Authorization callback URL**: `https://your-domain.com/github-callback`

### 📝 Environment Variables

Already created `.env.local` with:
```
VITE_GITHUB_CLIENT_ID=Ov23liG0CrOCSpP3pGEs
```

### 🚀 How It Works Now

1. **Blog Posts** = GitHub Issues with label `blog`
2. **Notes** = GitHub Issues with label `note`
3. **Comments** = GitHub Issue comments
4. **Authentication** = GitHub OAuth (no Supabase needed!)

### 📖 Usage

1. **Start dev server**: `npm run dev`
2. **Sign in with GitHub**: Click "Continue with GitHub" 
3. **Write posts**: Go to `/write` page
4. **View posts**: Auto-fetched from GitHub Issues

### ⚠️ Important Notes

- **Development Mode**: Uses mock token (read-only access to public repos)
- **Production Mode**: Requires backend server to securely exchange OAuth code for real token
- All blog posts are PUBLIC (GitHub Issues are public)
- No database required - everything stored in GitHub

### 🔒 Security Note

For production, you'll need a backend server to:
1. Receive the OAuth code
2. Exchange it for an access token using your client secret
3. Return the token to the frontend

Current setup works for **read-only** operations and **demo purposes**.

### 📦 What Was Removed

- ❌ Supabase integration
- ❌ DevpostService 
- ❌ Local storage for blogs/notes
- ❌ Email/password authentication

### ✅ What You Got

- ✅ GitHub OAuth authentication
- ✅ GitHub Issues as CMS
- ✅ Native comment system
- ✅ Version control for content
- ✅ Free and unlimited
- ✅ Markdown support
- ✅ Simpler architecture

## 🎯 Next Steps

1. Update GitHub OAuth callback URL (see above)
2. Run `npm run dev`
3. Test authentication flow
4. Create your first blog post!
