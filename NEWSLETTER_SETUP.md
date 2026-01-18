# Newsletter Setup Guide

The newsletter feature has been added to your portfolio website! Follow these steps to get it working.

## Quick Setup (Choose One Service)

### Option 1: Buttondown (Recommended) ⭐

**Why:** Simple, developer-friendly, free tier available, clean API

1. Sign up at [buttondown.email](https://buttondown.email)
2. Go to Settings → API
3. Copy your API key
4. Create a `.env.local` file in the root directory:
   ```bash
   BUTTONDOWN_API_KEY=your_api_key_here
   ```
5. Restart your development server

**Free Tier:** Up to 1,000 subscribers

---

### Option 2: ConvertKit

**Why:** Great for creators, good analytics, free tier

1. Sign up at [convertkit.com](https://convertkit.com)
2. Create a form in ConvertKit
3. Get your API key from Settings → Advanced → API Secret
4. Get your Form ID from the form URL (e.g., `https://app.convertkit.com/forms/123456`)
5. Create a `.env.local` file:
   ```bash
   CONVERTKIT_API_KEY=your_api_key_here
   CONVERTKIT_FORM_ID=your_form_id_here
   ```
6. Restart your development server

**Free Tier:** Up to 1,000 subscribers

---

### Option 3: Mailchimp

**Why:** Most popular, extensive features

1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Create an audience/list
3. Get your API key from Account → Extras → API keys
4. Get your List ID from Audience → Settings → Audience name and defaults
5. Create a `.env.local` file:
   ```bash
   MAILCHIMP_API_KEY=your_api_key_here
   MAILCHIMP_LIST_ID=your_list_id_here
   ```
6. Restart your development server

**Free Tier:** Up to 500 contacts

---

### Option 4: Resend (Custom Email)

**Why:** For custom email handling, if you want to manage subscribers yourself

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from API Keys section
3. Create a `.env.local` file:
   ```bash
   RESEND_API_KEY=your_api_key_here
   NEWSLETTER_EMAIL=your_email@example.com
   ```
4. Restart your development server

**Note:** This will send you an email notification for each subscription. You'll need to manage subscribers manually.

---

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. In Project Settings → Environment Variables, add your chosen service's API keys
4. Redeploy your application

### Other Platforms

Add your environment variables in your hosting platform's settings:
- Netlify: Site Settings → Environment Variables
- Railway: Variables tab
- Render: Environment section

---

## Testing

1. Start your development server: `npm run dev`
2. Navigate to your homepage
3. Scroll to the newsletter section
4. Enter an email and click "Subscribe"
5. Check your email service dashboard to confirm the subscription

---

## Troubleshooting

**Error: "Newsletter service not configured"**
- Make sure you've created `.env.local` with the correct variable names
- Restart your development server after adding environment variables

**Error: "Failed to subscribe"**
- Check that your API key is correct
- Verify your service account is active
- Check the browser console and server logs for detailed error messages

**Not receiving emails**
- Check your spam folder
- Verify email delivery settings in your service dashboard
- For Buttondown/ConvertKit: Check if double opt-in is enabled

---

## Customization

The newsletter component is located at `components/newsletter-section.tsx`. You can customize:
- Text and messaging
- Styling and colors
- Form layout
- Success/error messages

The API route is at `app/api/newsletter/route.ts` if you need to modify the integration logic.

---

## Need Help?

- Check the API documentation for your chosen service
- Review the error messages in your browser console
- Check server logs for detailed error information
