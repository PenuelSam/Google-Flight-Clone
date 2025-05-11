# 🛫 Google Flights Clone

A fast, beautiful, and responsive Google Flights-inspired web app that lets you search for flights using the [Sky-Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper). Built in **4 days** with a product-first mindset and zero fluff.

## 🚀 Features

- 🔍 Search for flights by origin, destination, and date
- 📅 Smart date inputs with trip type (round trip/one way)
- 🌍 Select passenger count and travel class
- ⚡ Real-time results from the Sky-Scrapper API
- 🌓 Theme toggle: light, dark, system
- 💻 Fully responsive — mobile to desktop
- 🎯 Clean UI inspired by Google Flights
- 🧠 Built with a scalable architecture (modular, maintainable)

## 🛠 Tech Stack

- **Vite + React** — Fast dev experience
- **TailwindCSS** — Utility-first styling with full design control
- **Axios** — API calls made simple
- **React Hook Form** — Robust form handling
- **Headless UI** — Custom dropdowns without opinionated styles
- **Sky-Scrapper API** via RapidAPI — Real-time flight data
- **Framer Motion** (optional) — Smooth subtle animations

## 🧩 Folder Structure

```bash
src/
│
├── components/      # Reusable components (Form, Navbar, FlightCard)
├── pages/           # Page-level components
├── hooks/           # Custom React hooks (e.g., useFlights)
├── context/         # Theme & App state context
├── api/             # Axios instances & API handlers
├── assets/          # Images, icons, etc.
├── App.tsx          # App shell
└── main.tsx         # Entry point
