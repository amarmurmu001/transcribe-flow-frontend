Google Search Console Verification File
========================================

To verify ownership of https://transcribe-flow-v1.vercel.app in Google Search Console:

1. Go to https://search.google.com/search-console
2. Add property: "https://transcribe-flow-v1.vercel.app"
3. Choose "HTML tag" verification method
4. Google gives you a meta tag like:
   <meta name="google-site-verification" content="xxxxxxxxxxxx" />
5. Copy the "content" value (the xxxxxxxxxxxx part)
6. Open /app/layout.tsx and replace "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE"
   with the actual code from Google
7. Deploy the changes to Vercel
8. Click "Verify" in Google Search Console

Alternative: Use DNS TXT record verification instead
(Recommended for production domains)

Alternative: Upload this HTML file method
If you prefer file-based verification:
1. Download the verification HTML file from Google Search Console
2. Place it in /public/ directory
3. Deploy and verify
