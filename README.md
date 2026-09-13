# 📸 Dhanushka Ashen Photography - Portfolio Website

A cinematic, modern, and fully responsive photography portfolio website crafted specifically for **Dhanushka Ashen Photography**.

---

## 🌟 Key Features

1. **Cinematic Hero Slideshow & Ken-Burns Motion**:
   - Continuous luxury slideshow transitioning between high-res wedding, portrait, and couple shoot photography every 5.5 seconds.
   - Interactive slide indicator dots for direct photo selection.
   - Smooth Ken-Burns zoom animation (`scale 1.0 -> 1.08`).

2. **Fluid Scroll & Micro-Animations**:
   - Modern scroll reveal animations (slide-up, slide-left, slide-right, and scale) for sections, images, and pricing cards.
   - Animated floating photographer badge.
   - Light shimmer reflection sweep on primary action buttons.
   - Glowing breathing pulse on WhatsApp buttons.

3. **Direct WhatsApp Inquiry Forwarding (`078 130 0607`)**:
   - When a client fills the booking form (Name, Phone, Email, Shoot Type, Event Date, Notes), the website automatically formats the message into a clean, structured message and **instantly opens WhatsApp** to send it directly to Dhanushka Ashen (`078 130 0607`)!
   - Instant direct chat button for quick inquiries.

4. **Interactive Portfolio Gallery with Fullscreen Lightbox**:
   - Filter by categories: **All**, **Weddings**, **Pre-Shoots**, **Portraits**, **Events**, and **Nature & Travel**.
   - Fullscreen **Lightbox Modal** with previous/next photo navigation, keyboard support (`Escape`, `ArrowLeft`, `ArrowRight`), and image details.

5. **Client Services & Pricing Packages**:
   - Pre-Wedding Romance, The Royal Wedding (Featured), and Portrait & Editorial Branding packages with detailed inclusions.

6. **Client Testimonials**:
   - Elegant reviews section showcasing 5-star feedback from happy clients.

---

## 🚀 How to Open & Test Locally

You do not need to install Node.js, Python, or any packages!

1. Open your File Explorer and navigate to:
   ```
   C:\Users\Ashen\.gemini\antigravity\scratch\dhanushka-ashen-photography
   ```
2. Double-click **`index.html`** to open the website directly in Google Chrome, Microsoft Edge, or any browser of your choice.

---

## ✏️ How to Customize

### 1. WhatsApp Number
- Configured with your number: **`078 130 0607`** (`94781300607` in international format).
- Located in:
  - `script.js` (line 7): `const PHOTOGRAPHER_PHONE = "94781300607";`
  - `index.html` in the Contact & Footer sections.

### 2. Replace Placeholder Photos with Your Own Photos
- You can create a folder named `images/` inside the project folder:
  ```
  dhanushka-ashen-photography/
  ├── images/
  │   ├── hero1.jpg
  │   ├── wedding1.jpg
  │   └── preshoot1.jpg
  ├── index.html
  ├── styles.css
  └── script.js
  ```
- In `index.html`, locate the `<div class="hero-slide">` and `<div class="portfolio-card">` elements and update the `src` / `background-image` attributes.

### 3. Update Social Media Links
- In `index.html` under the `<!-- Social Links -->` section, replace `https://instagram.com`, `https://facebook.com`, etc. with your exact profile URLs (e.g., `https://instagram.com/dhanushka_ashen_photography`).

---

## 🌐 How to Host Your Website Online (Free)

### Option 1: Netlify Drop (Easiest - 1 Minute)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `dhanushka-ashen-photography` folder onto the page.
3. Your website goes live immediately with a free `.netlify.app` URL and free SSL certificate!
4. You can also connect your own custom domain (e.g., `dhanushkaashen.com`).

### Option 2: GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings** > **Pages** > Select `main` branch.
3. Your site is live for free forever!

### Option 3: Vercel
1. Import the project directly into [Vercel](https://vercel.com) for ultra-fast global CDN delivery.
