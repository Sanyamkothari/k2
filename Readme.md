# K2 Architects - Official Website

A modern, responsive, and performance-oriented website showcasing the architectural philosophy, portfolio, sectors, and team of **K2 Architects**.

---

## 📁 Codebase Architecture

The project adheres to a clean, modular static web architecture with clear separation of concerns:

```
public_html_FULL_SITE/
├── index.html              # Landing page (Hero banner, About Us, Sectors, Team, Clients)
├── projects.html           # Interactive project portfolio gallery with category filters
├── contactus.html          # Contact details, inquiry button, and embedded Google Map
│
├── css/                    # Modular stylesheets
│   ├── style.css           # Global resets, typography, and homepage styling
│   ├── projects.css        # Projects grid layout, filter buttons, and modal preview
│   └── contact.css         # Contact layout, cards, and responsive map styling
│
├── js/                     # Modular JavaScript
│   ├── main.js             # Global navigation, mobile burger, scroll effects, preloader
│   ├── projects.js         # Dynamic portfolio loader, tab filtering, and full-screen modal
│   └── vendor/
│       └── tilt.js         # 3D parallax tilt effect for cards
│
├── data/
│   └── projects.json       # Structured project database (57 projects across 7 categories)
│
├── images/                 # Image assets (hero backgrounds, team photos, project photos)
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
- **Full-Screen Project Preview**: Interactive modal with keyboard (`Escape`) and backdrop click support.
- **Consistent Data Standards**: Uniform `CITY (STATE)` notation across all projects.
- **Projects Without Photographs**: A project entry in `data/projects.json` may omit the `image` field. It is still listed in its category, rendered as a "Photograph coming soon" placeholder card instead of being hidden:

```json
{ "id": 26, "title": "PROJECT NAME", "description": "CITY (STATE)" }
```

---

## 💻 Local Development & Preview

To run and preview the site locally using Python's built-in HTTP server:

```bash
# 1. Open the project root directory
cd public_html_FULL_SITE

# 2. Start a local HTTP server
python3 -m http.server 8080

# 3. Open in your browser
open http://localhost:8080
```

---

## 👥 Credits

- **Principal Architect**: Ar. Sachin Kothari
- **Landscape Architect**: Ar. Riya Kothari
- **Firm**: K2 Architects (Nagpur, Maharashtra)
