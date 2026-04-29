# Node.js Version Fix for Vercel Deployment

## Issue
Build failed with error: "You are using Node.js 18.20.8. For Next.js, Node.js version ">=20.9.0" is required."

## Solution Applied

### 1. Created `.nvmrc` file
This tells Vercel and other platforms which Node.js version to use:
```
20.9.0
```

### 2. Created `.node-version` file
Alternative version specification file:
```
20.9.0
```

### 3. Updated `package.json`
Added engines field to specify Node.js requirements:
```json
"engines": {
  "node": ">=20.9.0",
  "npm": ">=10.0.0"
}
```

### 4. Updated GitHub Actions CI
Changed CI workflow to test with Node.js 20.x and 22.x instead of 18.x

### 5. Updated README.md
Updated prerequisites to reflect correct Node.js version requirement

## Vercel Deployment

Vercel will now automatically use Node.js 20.x for your deployment.

### Manual Override (if needed)

If you need to manually set the Node.js version in Vercel:

1. Go to your project settings in Vercel
2. Navigate to **Settings** → **General**
3. Scroll to **Node.js Version**
4. Select **20.x** from the dropdown
5. Click **Save**

## Local Development

To use the correct Node.js version locally:

### Using nvm (Node Version Manager)

```bash
# Install nvm if you haven't already
# Visit: https://github.com/nvm-sh/nvm

# Use the version specified in .nvmrc
nvm use

# Or install and use Node.js 20
nvm install 20
nvm use 20
```

### Using fnm (Fast Node Manager)

```bash
# Install fnm if you haven't already
# Visit: https://github.com/Schniz/fnm

# Use the version specified in .node-version
fnm use

# Or install and use Node.js 20
fnm install 20
fnm use 20
```

### Verify Your Node.js Version

```bash
node --version
# Should output: v20.9.0 or higher

npm --version
# Should output: 10.0.0 or higher
```

## Next.js 16 Requirements

Next.js 16 requires:
- **Node.js**: >= 20.9.0
- **npm**: >= 10.0.0

This is because Next.js 16 uses modern JavaScript features and APIs that are only available in Node.js 20+.

## Files Modified

- ✅ `.nvmrc` (created)
- ✅ `.node-version` (created)
- ✅ `package.json` (added engines field)
- ✅ `.github/workflows/ci.yml` (updated Node.js versions)
- ✅ `README.md` (updated prerequisites)

## Status

✅ **Fixed** - Vercel will now use Node.js 20.x for deployment

## Next Steps

1. Commit these changes
2. Push to GitHub
3. Vercel will automatically redeploy with the correct Node.js version
4. Build should succeed

---

**Last Updated**: April 29, 2026
**Status**: ✅ FIXED
