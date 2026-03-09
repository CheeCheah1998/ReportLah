# 🔥 CLAUDE SUPER PROMPT – Generate REPORTLAH Next.js POC (Frontend Only)

You are a senior frontend architect and React expert.

Generate a COMPLETE working Next.js 14 (App Router) project for a web app called **REPORTLAH**.

This is a FRONTEND-ONLY Proof of Concept.

There must be:

* No backend
* No authentication
* No database
* No API calls
* Only static mock data
* Fully functional map UI
* Clean scalable architecture

---

# 🎯 PROJECT GOAL

Build a frontend-only map-based reporting viewer that:

1. Displays an interactive Mapbox map
2. Shows mock business price report markers
3. Shows mock corruption report markers
4. Allows clicking markers to view details in a modal
5. Allows filtering by category
6. Allows searching business name
7. Uses clean reusable components
8. Looks modern and production-ready

---

# 🧱 TECH REQUIREMENTS

Use:

* Next.js 14 (App Router)
* React
* TypeScript
* Tailwind CSS
* Mapbox GL JS
* Functional components only
* No class components
* No external UI libraries except Tailwind

---

# 📁 REQUIRED PROJECT STRUCTURE

Generate complete file structure like:

/app
layout.tsx
page.tsx
globals.css

/components
MapComponent.tsx
MarkerPopup.tsx
ReportModal.tsx
FilterPanel.tsx
SearchBar.tsx

/lib
mockData.ts
types.ts

/styles
map.css

Also include:

* package.json
* tailwind.config.ts
* next.config.js
* .env.example (with MAPBOX token placeholder)

---

# 🗺 MAP FEATURES

Map must:

* Use Mapbox

* Load from environment variable: NEXT_PUBLIC_MAPBOX_TOKEN

* Default location: Kuala Lumpur coordinates

* Enable zoom and pan

* Render two different marker types:

  🏪 Blue marker → Business Price Report
  🚔 Red marker → Corruption Report

* Cluster markers when zoomed out

* Show popup on click

* Open modal with full details

---

# 📊 MOCK DATA REQUIREMENTS

Create realistic mock data in /lib/mockData.ts

Include:

At least:

* 8 businesses
* 15 price reports
* 6 corruption reports

Each business:

* id
* name
* category (CarRepair, Renovation, Lawyer, Healthcare, etc.)
* latitude
* longitude

Each price report:

* id
* businessId
* serviceType
* amount
* description
* date

Each corruption report:

* id
* latitude
* longitude
* policeStation
* description
* date
* isVerified (boolean)

---

# 🎨 UI REQUIREMENTS

Design must:

* Use Tailwind
* Be responsive
* Have clean modern spacing
* Use rounded corners
* Use subtle shadows
* Have hover effects
* Look startup-ready

Layout:

---

## | Search Bar | Filter Dropdown                |

|                                               |
|                FULL MAP VIEW                 |
|                                               |
-------------------------------------------------

Modal design:

* Centered
* Backdrop blur
* Close button
* Show all details

---

# 🔎 FILTER FEATURES

Filter dropdown:

* All
* CarRepair
* Renovation
* Lawyer
* Healthcare

Search:

* Search by business name
* Case insensitive
* Real-time filtering

---

# 🧠 STATE MANAGEMENT

Use:

* useState
* useMemo
* useEffect

No Redux.
No external state libraries.

---

# 🛡 CLEAN CODE REQUIREMENTS

* Strong TypeScript typing
* No any types
* Separate logic from UI
* Use reusable components
* Comment important sections
* Avoid repetition
* Use good naming conventions

---

# 📦 OUTPUT FORMAT

Output:

1. Full file tree
2. Then each file with complete code
3. Clear file separators like:

// ===== FILE: app/page.tsx =====

Make sure code is COMPLETE and runnable without missing pieces.

---

# 🚀 FINAL GOAL

When I run:

npm install
npm run dev

It should:

* Start successfully
* Show interactive map
* Show markers
* Show modal
* Allow search and filter
* Work without backend

Do not skip any files.
Do not summarize.
Generate full production-level code.

END OF INSTRUCTION.
