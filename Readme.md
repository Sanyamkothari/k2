# K2 Architects - Official Website

A modern, responsive, and performance-oriented website showcasing the architectural philosophy, portfolio, sectors, and team of **K2 Architects**.

---

## 📁 Codebase Architecture

The project adheres to a clean, modular static web architecture with clear separation of concerns:

```
k2/
├── index.html              # Landing page (Hero banner, About Us, Sectors, Team, Clients)
├── projects.html           # Interactive project portfolio gallery with category filters
├── contactus.html          # Contact details, inquiry button, and embedded Google Map
├── 404.html                # Not-found page
├── robots.txt              # Crawler rules (hides hostels/ and archive/)
│
├── css/                    # Modular stylesheets
│   ├── style.css           # Global resets, typography, and homepage styling
│   ├── projects.css        # Projects grid layout, filter buttons, and modal preview
│   └── contact.css         # Contact layout, cards, and responsive map styling
│
├── js/                     # Modular JavaScript
│   ├── main.js             # Global navigation, mobile burger, scroll effects, preloader
│   └── projects.js         # Dynamic portfolio loader, tab filtering, and multi-image gallery modal
│
├── data/
│   └── projects.json       # Structured project database (69 projects across 7 categories)
│
├── images/                 # Image assets (max 1920px, JPEG q82) with card thumbnails in images/thumbs/
│
├── archive/                # Safely preserved legacy files and reference templates
│   ├── ar.k2web/
│   ├── default.php.bak
│   ├── p1.html & gallery.css
│   ├── ref.html & ref.css
│   └── used
│
├── hostels/                # Independent backend application (Hostel Management System)
└── .gitignore              # Standard version control ignore rules
```

---

## 🚀 Key Features

- **Modular Asset Organization**: Clean separation between markup (`*.html`), stylesheets (`css/`), scripts (`js/`), and data (`data/`).
- **Dynamic Project Filtering**: Fast clientside rendering and filtering for 7 categories (Schools, Residential, Hostels, Bungalows, Banquets, Hospitals, Colleges).
- **Responsive Navigation**: Synchronized navbar across pages with smooth transitions and mobile hamburger menu support.
- **Full-Screen Project Gallery**: Multi-image modal with prev/next, dots, counter, keyboard (`Escape`, arrow keys), swipe and backdrop click support.
- **Consistent Data Standards**: Uniform `CITY (STATE)` notation across all 69 projects.

---

## 💻 Local Development & Preview

To run and preview the site locally using Python's built-in HTTP server:

```bash
# 1. Open the project root directory
cd k2

# 2. Start a local HTTP server
python3 -m http.server 8080

# 3. Open in your browser
open http://localhost:8080
```

---

## 🖼️ Adding Projects

1. Add the photo(s) to `images/` (keep the longest side at or under 1920px; JPEG quality ~82).
2. Create a 640px-wide thumbnail in `images/thumbs/` (same base name, `.jpg`).
3. Add an entry to `data/projects.json` with `title`, `description`, `image`, `thumb` and an `images` array (first entry is the cover).

## 🔐 Secrets

`hostels/hostel_management_v2/.env` and `utils/logs/*.log` are git-ignored and must never be committed. The `hostels/` app should not be deployed inside the public web root.

## 👥 Credits

- **Principal Architect**: Ar. Sachin Kothari
- **Landscape Architect**: Ar. Riya Kothari
- **Firm**: K2 Architects (Nagpur, Maharashtra)
