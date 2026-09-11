# What's New — Admin, Photos, Location & WhatsApp

This is your existing project with the following added/changed. Everything
below is editable from the admin panel — no code changes needed going forward.

## 1. WhatsApp / contact number
Set to **6230521544** everywhere (header, hero, footer, contact page, every
"Book on WhatsApp" button). You can change it any time from
`/admin/settings` — it updates the whole site instantly, no redeploy needed.

## 2. New: Business Settings page (`/admin/settings`)
A new admin screen to edit, without touching code:
- Business name & tagline
- Location / full address / map search text
- Phone numbers & WhatsApp number
- Email & operating hours

The Contact page now shows a real embedded Google Map (built from your
address — no Google API key required) plus a "Get Directions" button.

## 3. Real photo uploads
Every content screen (Fleet / Vehicles, Destinations / Routes, Tour
Packages, Gallery) now has an actual **"Upload Photo"** button — pick a
JPG/PNG/WEBP from your computer and it's stored on your server and shown
immediately on the live site with a nice rounded, hover-zoom card. (Before,
these forms only accepted a pasted image URL, and the public pages weren't
even displaying the image field — that's fixed too.)

Destinations also got a new optional "Google Maps Link" field per route.

## 4. Prices removed from the public site
Fleet, Destinations and Tour Packages no longer show ₹ prices. Every card
now says "Contact for Best Price" with a WhatsApp button, so customers
message you directly. The price fields still exist in the admin forms
(optional, labeled "internal note only") if you want to keep a private
reference for yourself — they're just never shown to visitors.

## Setup reminders
- Copy `server/.env.example` to `server/.env` and fill in your MongoDB URI,
  a real `JWT_SECRET`, and your admin login (`ADMIN_SEED_EMAIL` /
  `ADMIN_SEED_PASSWORD`).
- Copy `client/.env.example` to `client/.env`.
- From `server/`, run `npm install` then `npm run seed` once to create your
  admin login and starter content (including the default Settings with the
  new WhatsApp number — edit it any time at `/admin/settings`).
- `npm run dev` in both `server/` and `client/` to run locally.
- Log in at `/admin/login` with the seeded admin email/password, then use
  the sidebar: Dashboard, Bookings, Fleet, Routes, Tour Packages, Gallery,
  Reviews, Enquiries, **Settings**.
- Uploaded photos are saved to `server/uploads/` and served at
  `/uploads/...` — make sure that folder persists on whatever host you
  deploy to (it's already git-ignored except for a `.gitkeep`).

Note: I deliberately did not hardcode any stock/demo photos into the code —
that avoids licensing surprises on a live business site. Until you upload
your own car and destination photos from the admin panel, those cards show
a clean icon placeholder instead of a broken or generic photo.
