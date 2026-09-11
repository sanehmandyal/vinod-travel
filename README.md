# Vinod Tour & Travels — Cab Booking Platform (MERN Stack)

A fully responsive cab-booking & Himachal tour website for **Vinod Tour & Travels** (ISBT Una,
Himachal Pradesh), built as a complete MERN stack project based on the provided Stitch UI design
("Alpine Heritage Luxury" theme).

## Folder Structure

```
vinod-tour-travels/
├── client/                 # React + Vite + Tailwind CSS frontend
│   ├── src/
│   │   ├── api/            # Axios client + API call helpers
│   │   ├── components/     # Reusable UI (Header, Footer, sections, admin UI)
│   │   ├── context/        # AuthContext (admin login state)
│   │   ├── data/           # Site config + fallback content
│   │   ├── pages/          # Route-level pages
│   │   │   └── admin/      # Admin dashboard pages
│   │   ├── hooks.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Node.js + Express + MongoDB backend
│   ├── config/db.js
│   ├── models/              # Mongoose schemas
│   ├── controllers/
│   ├── routes/
│   ├── middleware/          # JWT auth + error handling
│   ├── seed/seed.js         # Seeds sample content + admin user
│   └── server.js
│
└── README.md
```

## Features

- **Public website**: Hero + WhatsApp-first booking engine, Services, Fleet, Destinations/Routes,
  Why Choose Us, Tour Packages, Reviews (with a public "submit a review" form), Gallery, and a
  Contact section with a direct booking-request form.
- **WhatsApp-first booking**: every "Book Now" / quote button opens WhatsApp with a pre-filled
  message, matching the original design brief. Booking form submissions are also saved to MongoDB.
- **Admin dashboard** (`/admin/login`): booking stats, full booking management (status updates),
  and full CRUD content management for Fleet, Routes/Destinations, Tour Packages, Gallery, plus
  review moderation (approve/reject) and contact enquiry tracking.
- **Fallback content**: if the API isn't running yet, the site still renders full sections using
  local fallback data — so the frontend can be previewed on its own.
- Fully responsive — mobile, tablet, and desktop layouts.

## Getting Started

### 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env: set MONGO_URI, JWT_SECRET, and admin seed credentials
npm run seed      # populates sample vehicles/routes/packages/reviews + creates admin user
npm run dev        # starts API on http://localhost:5000
```

### 2. Frontend setup

```bash
cd client
npm install
cp .env.example .env
# Edit .env if your API runs on a different URL, and set your real WhatsApp number
npm run dev        # starts React app on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000` (see `vite.config.js`), so
both can run side by side during development.

### 3. Admin login

After running `npm run seed`, log in at `/admin/login` using the email/password set in
`server/.env` (`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`).

### 4. Production build

```bash
cd client && npm run build     # outputs client/dist
cd ../server && NODE_ENV=production npm start
```

When `NODE_ENV=production`, the Express server serves the built React app directly, so you only
need to deploy the `server/` folder (with `client/dist` alongside it) to a single host.

## Before Going Live — Replace Placeholder Business Info

This project ships with **placeholder** contact details, fleet, routes, packages, and reviews so
the site is fully functional out of the box. Before launch, update:

- `client/src/data/siteConfig.js` — phone numbers, WhatsApp number, email, address, hours
- `client/.env` — `VITE_WHATSAPP_NUMBER`
- Re-run `npm run seed` in `server/` (or edit content directly from `/admin`) with **verified**
  fleet, real rates, actual routes, and genuine customer reviews once provided by the business
  owner — see the checklist in the original design brief.

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
