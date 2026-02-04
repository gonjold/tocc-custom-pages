# TOCC Custom Pages

Custom website page design system and content for **Toyota of Coconut Creek** (toyotaofcoconutcreek.com), built to integrate with Dealer Inspire WSP.

## Quick Start

### 1. Link the CSS into DI

Go to **Appearance → Customizer → Additional CSS** in the DI backend and add:

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://cdn.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/css/tocc-pages.css');
```

### 2. Add JS (optional — needed for FAQ accordions and tabs)

Ask DI support to add this before `</body>`:

```html
<script defer src="https://cdn.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/js/tocc-pages.js"></script>
```

Or embed the JS inline on individual pages that need accordions/tabs.

### 3. Create Pages in DI

1. Go to **Pages → Add New** in DI backend
2. Switch to **Text** mode (not Visual)
3. Paste the HTML content from the appropriate page file
4. Set page title, slug, and Yoast meta
5. Publish

## File Structure

```
tocc-custom-pages/
├── css/
│   └── tocc-pages.css      ← Master stylesheet (all components)
├── js/
│   └── tocc-pages.js       ← Accordion, tabs, smooth scroll
├── preview.html             ← Open locally to see all components
└── README.md
```

## CSS Delivery via jsDelivr

Files are served automatically from this repo via jsDelivr CDN:

```
https://cdn.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/css/tocc-pages.css
https://cdn.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/js/tocc-pages.js
```

**Cache busting:** jsDelivr caches files. To force an update after pushing changes, use a version tag or purge the cache at `https://purge.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/css/tocc-pages.css`

## Design System

- **Namespace:** All classes prefixed with `tocc-`
- **Fonts:** Plus Jakarta Sans (headings), DM Sans (body)
- **Primary Color:** #EB0A1E (Toyota Red)
- **Mobile-first:** Base styles = mobile, media queries enhance upward
- **Breakpoints:** sm: 576px, md: 768px, lg: 992px, xl: 1200px

## Components

| Component | CSS Class | Description |
|-----------|-----------|-------------|
| Hero Banner | `.tocc-hero` | Full-width image + overlay + headline |
| Stats Bar | `.tocc-stats` | 4-column number callouts |
| Value Props | `.tocc-values__grid` | Card grid with icons |
| Content Block | `.tocc-content-block` | Alternating text + image |
| CTA Strip | `.tocc-cta-strip` | Colored bar with CTA |
| FAQ Accordion | `.tocc-faq__list` | Expandable Q&A (requires JS) |
| Comparison Table | `.tocc-table` | Responsive table with highlights |
| Testimonials | `.tocc-testimonials__grid` | Customer review cards |
| Staff Cards | `.tocc-staff__grid` | Photo + info cards |
| Research Cards | `.tocc-research__grid` | Vehicle model grid |
| Pricing Cards | `.tocc-pricing__grid` | Service pricing with features |
| Process Steps | `.tocc-steps__grid` | Numbered how-it-works |
| Tabs | `.tocc-tabs` | Filterable tab panels (requires JS) |
| Language Cards | `.tocc-lang-cards` | Multi-language selector |
| Breadcrumbs | `.tocc-breadcrumbs` | Navigation breadcrumbs |

---

Built by Jon Gold + Claude AI | Toyota of Coconut Creek | 2026
