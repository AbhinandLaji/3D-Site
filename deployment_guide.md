# AURA Smartwatch | Vercel & Cloudflare Deployment Guide

Follow these steps to deploy the AURA showcase site on **Vercel** and proxy it through **Cloudflare** for maximum CDN performance, security, and custom domain setup.

---

## 🚀 Option 1: Deploying to Vercel (Recommended)

Next.js has native integration with Vercel, providing optimal performance and edge caching automatically.

### Step 1: Import Repository
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import the `3D-Site` repository.
4. Keep the default settings (Vercel automatically detects Next.js framework settings).
5. Click **Deploy**. Vercel will build and host the site dynamically.

### Step 2: Configure Cloudflare Proxy DNS
If you own a custom domain on Cloudflare (e.g., `aura-smartwatch.com`):
1. In Vercel, go to **Project Settings** > **Domains**.
2. Add your custom domain. Vercel will prompt you to set up a DNS record (e.g. CNAME to `cname.vercel-dns.com`).
3. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) and go to your domain's **DNS Records**.
4. Create the records:
   - **CNAME** record for `www` pointing to `cname.vercel-dns.com` (set Proxy Status to **Proxied**).
   - **A** or **CNAME** record for root `@` pointing to Vercel's IP (`76.76.21.21`) or `cname.vercel-dns.com` (set Proxy Status to **Proxied**).

### Step 3: Critical Cloudflare SSL Configuration (Avoid Redirect Loop)
By default, proxying Vercel through Cloudflare can cause a circular redirect loop (`ERR_TOO_MANY_REDIRECTS`) if SSL settings are misaligned.
1. In Cloudflare, go to **SSL/TLS** > **Overview**.
2. Change the SSL/TLS encryption mode from *Flexible* to **Full (Strict)**.
   > [!IMPORTANT]
   > Do NOT use *Flexible*. Using *Flexible* causes Cloudflare to connect to Vercel via HTTP, but Vercel redirects it to HTTPS, creating an infinite loop. **Full (Strict)** ensures encrypted end-to-end communication.

---

## ☁️ Option 2: Deploying Directly to Cloudflare Pages (Static Export)

Since the AURA showcase generates static preloaded content, you can compile Next.js into a fully static asset bundle (`out/` folder) and serve it directly via **Cloudflare Pages**.

### Step 1: Enable Static Export in Next.js
Open `next.config.ts` and set the output to export:
```typescript
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export as image resizing happens client-side
  }
}
```

### Step 2: Create a Cloudflare Pages Project
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Navigate to **Workers & Pages** > **Pages** > **Connect to Git**.
3. Select your `3D-Site` repository.
4. Set the build configurations:
   - **Framework Preset**: `Next.js (Static HTML Export)`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `out`
5. Click **Save and Deploy**. Cloudflare will automatically build and host the static files on their global edge network.
