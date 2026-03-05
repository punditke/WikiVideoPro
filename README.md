🎥 WikiVideo Pro – Premium Video Discovery from Wikimedia Commons

https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=render
https://img.shields.io/github/stars/punditke/WikiVideoPro?style=for-the-badge&logo=github
https://img.shields.io/github/license/punditke/WikiVideoPro?style=for-the-badge
https://img.shields.io/badge/contact-@punditke-blue?style=for-the-badge&logo=telegram

WikiVideo Pro is a beautifully designed, fully responsive video discovery portal that taps into the vast collection of free videos on Wikimedia Commons. Built with Next.js, Tailwind CSS, and Framer Motion, it offers a premium “dark luxury” interface with smooth animations, intelligent metadata display, and an immersive viewing experience.

---

✨ Features

· 📺 Cinematic Theater Mode – Click any video to open a split‑view player with detailed metadata, license info, and download options.
· 🔍 Advanced Search – Real‑time suggestions and glassmorphism design.
· 🗂️ Smart Categorization – Trending, Nature, Space, History, Science (easily extendable).
· 📱 Fully Responsive – 1 column on mobile, 2 on tablet, 4 on desktop.
· 🎨 Dark Luxury Aesthetic – Deep zinc and black palette with emerald accents, subtle borders, and backdrop blur.
· ⚡ Infinite Scroll – Automatically loads more videos as you scroll.
· 📦 Persistent Sidebar – Collapsible navigation rail with recent searches.
· 🔧 Wikimedia Commons API Integration – Fetches high‑quality thumbnails (600px), duration, license, and creator info.
· 🎞️ Built‑in Video Player – No redirects; play videos directly in the app.
· 🛠️ Developer Friendly – Clean code, custom hooks, and easy to extend.

---

🖼️ Screenshots

Home Grid Theater Mode
https://via.placeholder.com/400x250?text=Screenshot+Placeholder https://via.placeholder.com/400x250?text=Screenshot+Placeholder

(Replace placeholders with actual screenshots from your project.)

---

🧰 Tech Stack

· Framework: Next.js 14 (Pages Router)
· Styling: Tailwind CSS + custom zinc/emerald palette
· Animations: Framer Motion
· Icons: React Icons (HiOutline set)
· API: Wikimedia Commons API (public, no key required)
· Deployment: Render.com (one‑click deploy)

---

🚀 Live Demo

👉 https://wikivideopro.onrender.com
Test the search, explore categories, and enjoy the cinematic experience.

---

📦 Getting Started

Prerequisites

· Node.js 18.x or later
· npm / yarn / pnpm

Installation

1. Clone the repository
   ```bash
   git clone https://github.com/punditke/WikiVideoPro.git
   cd WikiVideoPro
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables
      Create a .env.local file in the root:
   ```env
   NEXT_PUBLIC_APP_NAME=WikiVideo Pro
   NEXT_PUBLIC_API_BASE=https://commons.wikimedia.org/w/api.php
   ```
   (The API base is public – no secrets required.)
4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open http://localhost:3000 in your browser.

Build for Production

```bash
npm run build
npm start
```

---

☁️ Deploy on Render (or any platform)

Deploy to Render (one‑click)

https://render.com/images/deploy-to-render-button.svg

Or manually:

1. Push your code to a GitHub repository.
2. On Render.com, create a New Web Service.
3. Connect your repository and use these settings:
   · Build Command: npm install && npm run build
   · Start Command: npm start
   · Environment: Node.js (version 20.x)
4. Add environment variables (same as .env.local).
5. Deploy – your app will be live in minutes.

Deploy to Vercel / Netlify

The project is a standard Next.js app, so it works seamlessly with Vercel, Netlify, or any Node.js hosting.

---

📚 API Reference

Your app exposes a built‑in proxy endpoint at /api/search to fetch videos from Wikimedia Commons.

Endpoint: https://wikivideopro.onrender.com/api/search
Method: GET
Query Parameters:

· query – search term (e.g., ?query=nature)

Example Request:

```bash
curl "https://wikivideopro.onrender.com/api/search?query=space"
```

Response: JSON array of video objects with metadata (title, thumbnail, duration, license, etc.).

⚠️ This endpoint is intended for use within the app. For external usage, please consider calling the Wikimedia Commons API directly to avoid rate‑limiting on this free service.

---

🗂️ Project Structure

```
WikiVideoPro/
├── components/          # Reusable UI components
│   ├── Sidebar.js
│   ├── VideoGrid.js
│   ├── SearchBar.js
│   └── CinematicTheater.js
├── context/             # React Context (AppContext)
├── hooks/               # Custom hooks (useVideos)
├── pages/               # Next.js pages
│   ├── _app.js
│   ├── _document.js
│   ├── index.js         # Homepage
│   └── api/             # API routes
│       └── search.js
├── styles/              # Global CSS with Tailwind
│   └── globals.css
├── utils/               # Helper functions (API calls)
├── public/              # Static assets
├── .env.local           # Environment variables (example)
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind theme
├── postcss.config.js    # PostCSS plugins
└── package.json
```

---

🤝 Contributing

Contributions, issues, and feature requests are most welcome!

1. Fork the repository.
2. Create a new branch (git checkout -b feature/amazing-feature).
3. Commit your changes (git commit -m 'Add some amazing feature').
4. Push to the branch (git push origin feature/amazing-feature).
5. Open a Pull Request.

---

📄 License

This project is MIT licensed – feel free to use it for your own purposes, commercial or personal. See the LICENSE file for details.

---

📬 Contact

Developed with ❤️ by Pundit Ke

· Telegram: @punditke
· GitHub: @punditke

If you have questions, suggestions, or just want to say hi, drop me a message on Telegram!

---

⭐ Support

If you like this project, please consider giving it a star on GitHub – it helps others discover it and motivates me to keep improving!

---

Happy exploring! 🚀
