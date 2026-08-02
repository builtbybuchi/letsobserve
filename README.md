# Let's Observe

A cross-platform health observatory mobile application that aggregates real-time global health data from multiple authoritative sources into a single, beautiful interface.

---

## Overview

Let's Observe brings together data from the **Disease.sh**, **World Bank**, **WHO Global Health Observatory**, and **REST Countries v5** APIs to give users an at-a-glance view of global health metrics, country-level health contexts, and historical trends.

The project is structured as a **monorepo**:

```
├── /                   # Expo (React Native) mobile app
├── backend/            # Hono API server on Cloudflare Workers
└── .github/workflows/  # CI/CD for backend deployment
```

## Features

### Global Monitor Dashboard
- 2×2 KPI grid showing total cases, active cases, recoveries, and deaths worldwide.
- 30-day historical trend line chart for global cases.
- Top 10 countries by active cases with quick-tap navigation to details.

### Country Discovery
- Searchable list of all countries with flag imagery.
- Detailed country view with COVID-19 KPIs and aggregated health context:
  - **REST Countries v5** — Capital, region, population.
  - **World Bank** — Life expectancy, health expenditure per capita, hospital beds per 1,000 people.
  - **WHO GHO** — Medical doctors per 10k, clean water access, adult mortality rate.

### Bookmarks
- Save countries locally for quick access.
- Persistent storage via `AsyncStorage`.

### AI Chat *(Coming Soon)*
- Placeholder tab for a future AI-powered health data assistant.

### Settings
- **Appearance** — Light, Dark, or System Default theme with persistent selection.
- **Notifications** — Push notification toggle.
- **About** — App version, Lexrunit company info, Privacy Policy & Terms of Service links.
- **Resources** — Contact Support, Instagram, X, LinkedIn, YouTube, Spotify.

### Design
- Custom floating pill-shaped bottom tab navigator with active dot indicators.
- Static global header with logo and settings access.
- Unified color system across light and dark themes.
- Smooth animated progress bar for data loading states.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native (Expo SDK 54), TypeScript |
| Navigation | React Navigation 7 (Bottom Tabs + Native Stack) |
| Charts | react-native-chart-kit + react-native-svg |
| Icons | @expo/vector-icons (MaterialCommunityIcons) |
| Backend API | Hono on Cloudflare Workers |
| Caching | Cloudflare Edge Cache (24-hour TTL) |
| Secrets | Doppler |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Doppler CLI](https://docs.doppler.com/docs/install-cli) *(optional, for secret management)*
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) *(for backend development)*

### 1. Clone & Install

```bash
git clone https://github.com/your-org/lets-observe.git
cd lets-observe

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Configure Secrets

Copy the example environment file and configure your secrets:

```bash
cp .env.example .env
```

### 3. Run the Backend Locally

```bash
cd backend

npm run dev

```

The backend will start at `http://localhost:8787`.

### 4. Run the Mobile App

```bash

npx expo start

```


---

## Backend API

The Hono backend proxies and aggregates all external API calls, implementing 24-hour edge caching and an 8-second timeout per upstream request.

| Endpoint | Description |
|----------|-------------|
| `GET /api/global` | Global COVID KPIs + 30-day historical data |
| `GET /api/countries` | All countries with COVID data |
| `GET /api/countries/top` | Top 10 countries by active cases |
| `GET /api/context/:iso2/:iso3` | Aggregated health context (REST Countries + World Bank + WHO) |

### Why a backend proxy?

- **CORS** — Browser-based testing of WHO/World Bank APIs fails without a proxy.
- **Rate Limits** — REST Countries v5 has strict monthly limits; edge caching ensures we hit the API at most once per day.
- **Performance** — A single `/api/context` call replaces 7 parallel client-side requests.
- **Security** — API keys stay on the server, never shipped to the client.

---

## Deployment

### Backend (Cloudflare Workers)

The backend auto-deploys on push to `main` via the GitHub Actions workflow at `.github/workflows/deploy-backend.yml`.

**Manual deployment:**

```bash
cd backend
doppler run -- wrangler deploy src/index.ts
```

### Mobile App (EAS Build)

To build an APK without Android Studio:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```


## Data Sources

| Source | Data Provided | Documentation |
|--------|--------------|---------------|
| [Disease.sh](https://disease.sh/) | COVID-19 statistics (global & per-country) | [Docs](https://disease.sh/docs/) |
| [REST Countries v5](https://restcountries.com/) | Country metadata (capital, region, population) | [Docs](https://restcountries.com/docs) |
| [World Bank API](https://datahelpdesk.worldbank.org/) | Life expectancy, health expenditure, hospital beds | [Docs](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589) |
| [WHO GHO API](https://www.who.int/data/gho/) | Medical doctors, clean water access, mortality rates | [Docs](https://www.who.int/data/gho/info/gho-odata-api) |

---

## License

This project is licensed under the [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0). You are free to view, fork, and use this software for **noncommercial purposes only**. Commercial use is not permitted. See [LICENSE](./LICENSE) for the full terms.

---

<p align="center">
  Made with ❤️ by <strong>Mmaduabuchi Onah</strong> for Lexrunit. 
</p>
