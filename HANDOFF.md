# TOCC Custom Pages - Session Handoff
## February 4, 2026 - End of Day Checkpoint

---

## PROJECT OVERVIEW

**Client:** Toyota of Coconut Creek (TOCC)
**Contact:** Jon Gold, Marketing Director
**Site:** alhendricksontoyota.com (transitioning to toyotaofcoconutcreek.com)
**Platform:** Dealer Inspire (DI) WSP (WordPress-based)
**Goal:** Build 15 custom pages with a unified design system, SEO-optimized, mobile-first

---

## CRITICAL CONTEXT

### Ownership (UPDATED Feb 4, 2026)
- **Owner:** Morgan Auto Group (NOT Al Hendrickson)
- **Messaging:** "New name, new management, same great deals"
- **New building** construction anticipated Q2 2026
- Do NOT reference "Al Hendrickson," "family-owned," "Al Cares," or "Al Says Yes" in any new content
- The old site still has Al Hendrickson branding everywhere - that's what we're replacing

### Content Rules
- **NO EM DASHES** anywhere (use periods, commas, or parentheses instead)
- **No palm watermark** component (removed from design system - SVG approach couldn't use actual logo)
- Write with personality and specificity, not generic stock language
- Answer-first content pattern for AI search optimization
- Include specific numbers ($35.55, 200+ employees, 30+ technicians)

---

## REPOSITORY

**GitHub:** https://github.com/gonjold/tocc-custom-pages
**Branch:** main
**Local path:** ~/Downloads/Downloads/tocc-custom-pages (note: double Downloads)
**CDN:** https://cdn.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/css/tocc-pages.css

### Files
| File | Lines | Purpose |
|------|-------|---------|
| css/tocc-pages.css | 2,038 | Complete design system stylesheet |
| preview.html | 805 | Component preview/reference page |
| README.md | - | Repo documentation |

### Deployment Workflow
```bash
cd ~/Downloads/Downloads/tocc-custom-pages
# Copy updated files into place
git add -A
git commit -m "description"
git push
# Purge CDN cache
curl -s https://purge.jsdelivr.net/gh/gonjold/tocc-custom-pages@main/css/tocc-pages.css
```

### CSS Injection in DI
- CSS is loaded via **Appearance > Customizer > Additional CSS** using `@import`
- DI requires signing a disclaimer before making Customizer changes
- There is NO user-accessible `<head>` code injection - DI locks that down
- See DI_CODE_INJECTION_AUDIT.md for full details on what's blocked

---

## DESIGN SYSTEM (tocc-pages.css)

### Architecture
- **Namespace:** All classes prefixed with `tocc-` to avoid DI/Bootstrap conflicts
- **Scoping:** Base resets scoped to `.tocc-page` wrapper using `:where()` for zero specificity
- **Layout:** CSS Grid and Flexbox (not Bootstrap grid) inside custom sections
- **Approach:** Mobile-first with breakpoints at 576px, 768px, 992px, 1200px

### CSS Sections (26 total)
| # | Section | Lines |
|---|---------|-------|
| 0 | CSS Custom Properties (variables) | 14-120 |
| 1 | Base/Reset (scoped to .tocc-page) | 122-208 |
| 2 | Layout Utilities | 209-353 |
| 3 | Buttons | 354-478 |
| 4 | Hero Banner | 479-615 |
| 5 | Stats Bar | 616-670 |
| 6 | Value Proposition Grid | 671-770 |
| 7 | Content Blocks (alternating text + image) | 771-827 |
| 8 | CTA Strip | 828-907 |
| 9 | FAQ Accordion | 908-1017 |
| 10 | Comparison Table | 1018-1163 |
| 11 | Testimonial Cards | 1164-1231 |
| 12 | Staff/Leadership Cards | 1232-1334 |
| 13 | Research/Model Cards | 1335-1401 |
| 14 | Tabs | 1402-1444 |
| 15 | Process Steps | 1445-1508 |
| 16 | Pricing/Service Cards | 1509-1597 |
| 17 | Checklist | 1598-1635 |
| 18 | Language Selector | 1636-1707 |
| 19 | Map/Contact Info Block | 1708-1781 |
| 20 | Breadcrumbs | 1782-1809 |
| 21 | Fine Print/Disclaimers | 1810-1821 |
| 22 | Utility Classes | 1822-1860 |
| 23 | Tropical/Logo-Inspired Elements | 1861-2028 |
| 24 | Print Styles | 2029-2038 |

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| --tocc-red | #EB0A1E | Toyota Red - primary buttons, CTAs |
| --tocc-red-dark | #C50818 | Hover states |
| --tocc-sunset | #F05A28 | Accent from logo - eyebrows, tropical elements |
| --tocc-ocean | #0077B6 | Accent from logo - ocean sections |
| --tocc-teal | #29ABE2 | Accent from logo - links, highlights |
| --tocc-sand | #F5E6C8 | Accent from logo - warm backgrounds |
| --tocc-black | #1A1A1A | Primary text |
| --tocc-dark | #2D2D2D | Dark section backgrounds |
| --tocc-gray-600 | #666666 | Secondary text |
| --tocc-gray-100 | #F5F5F5 | Light backgrounds |

### Typography
- **Headings:** Plus Jakarta Sans (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- Loaded via Google Fonts link in the page or @import in Additional CSS

### Key Components
| Component | Class | Variants |
|-----------|-------|----------|
| Hero Banner | .tocc-hero | Default (left), centered, compact, price callout |
| Stats Bar | .tocc-stats | Default (black), sunset gradient, ocean |
| Value Grid | .tocc-values__grid | Light, dark backgrounds |
| Content Block | .tocc-content-block | Default (img left), reverse (img right) |
| CTA Strip | .tocc-cta-strip | Red, dark, sunset, ocean |
| FAQ Accordion | .tocc-faq__item | Uses native `<details>`/`<summary>`, NOT .tocc-active |
| Comparison Table | .tocc-table-wrap | Light, dark |
| Staff Cards | .tocc-staff-card | Default, leadership variant |
| Pricing Cards | .tocc-pricing-card | Default, featured |
| Language Cards | .tocc-lang-card | With flag emoji |
| Wave Divider | .tocc-wave-divider | red-to-light, dark-to-ocean, light-to-dark, etc. |
| Section Variants | .tocc-section--* | light, dark, red, ocean, sunset |

---

## PAGES TO BUILD (15 total - NONE started yet)

All work so far has been design system and component library. No actual pages have been built.

| # | Page | URL | Priority | Notes |
|---|------|-----|----------|-------|
| 1 | Why Buy | /why-buy/ | HIGH | Showcase Morgan Auto Group transition, deals, no-pressure |
| 2 | Why Service | /why-service/ | HIGH | $35.55 oil change hero, service differentiators |
| 3 | About Us | /about-us/ | HIGH | Update existing - Morgan Auto Group, new building Q2 2026 |
| 4 | Contact Us | /contact-us/ | HIGH | Hours, map, multilingual staff |
| 5 | Tires | /tires/ | MEDIUM | Service page |
| 6 | Oil Change | /oil-change/ | HIGH | FLAGSHIP - $35.55 full-synthetic, all-in pricing |
| 7 | Service Menu | /service-menu/ | MEDIUM | Full service offerings with pricing |
| 8 | Financing | /financing/ | MEDIUM | 20+ lenders, all credit types |
| 9 | Leadership | /leadership/ | MEDIUM | Management team |
| 10 | Staff | /staff/ | MEDIUM | Full team directory |
| 11 | Trade/Sell Your Car | /trade/ | MEDIUM | Trade-in value tool |
| 12 | Toyota Research Hub | /research/ | LOW | Model research landing page |
| 13 | Hablamos Espanol | /hablamos-espanol/ | MEDIUM | Spanish language page |
| 14 | Falamos Portugues | /falamos-portugues/ | MEDIUM | Portuguese language page |
| 15 | Nou Pale Kreyol | /nou-pale-kreyol/ | MEDIUM | Haitian Creole language page |

### Per-Page Requirements (every page)
- Unique H1 with primary keyword
- Meta title (50-60 chars) with location + keyword
- Meta description (150-160 chars) with CTA
- H2/H3 hierarchy
- Primary keyword in first 100 words
- Internal links to 3-5 other site pages
- Image alt text on every image
- FAQ section (5-8 questions) with FAQPage schema
- LocalBusiness schema
- BreadcrumbList schema
- Answer-first content pattern for AI/GEO optimization

### Page HTML Structure
Pages are pasted into DI's WordPress text editor (Text mode). They should NOT include:
- `<html>`, `<head>`, `<body>` tags (DI provides these)
- Navigation or footer (DI provides these)
- Inline styles (everything in external CSS)

Pages SHOULD be wrapped in:
```html
<div class="tocc-page">
  <!-- all page content here -->
</div>
```

---

## BUGS FIXED TODAY (for reference)

### Session 1: Initial Build
- Built complete design system (2,000+ lines CSS)
- Created preview.html with all components
- Set up GitHub repo and jsDelivr CDN delivery
- Injected CSS via DI Customizer Additional CSS

### Session 2: Contrast Fixes
- Fixed dark-on-dark text visibility
- Fixed red-on-red button text
- Replaced emoji icons with Font Awesome
- Fixed hero title color (white on dark overlay)

### Session 3: Specificity Fix
- Root cause: `.tocc-page` base styles (0-1-1) overriding component classes (0-1-0)
- Solution: Wrapped base selectors in `:where()` for zero specificity

### Session 4: Tropical Branding
- Extracted colors from TOCC palm logo (sunset, ocean, teal, sand)
- Added wave dividers, ocean/sunset section variants
- Added flag emoji display to language cards

### Session 5: Class Mismatch Fixes (9 components)
- Comparison table, process steps, testimonials, staff grid/cards/photos, pricing grid/titles, hero padding

### Session 6: Component Rendering Fixes (7 issues)
- Content block spacing/ordering
- Double checkmarks in comparison tables
- Triple checkmarks in pricing cards
- Language card underlines
- Palm watermark not rendering (SVG currentColor issue)
- Red section eyebrow invisible
- Staff cards missing language badges

### Session 7 (current): Content + Final Fixes
- Removed all em dashes (0 remaining in HTML and CSS)
- Rewrote ownership content (Morgan Auto Group, not Al Hendrickson)
- Removed palm watermark component entirely (CSS + HTML)
- Fixed FAQ accordion (switched from .tocc-active to native details[open])
- Fixed language card underline (!important on text-decoration)

---

## KNOWN ISSUES / TODO

### Preview Page Cleanup
- "Contact Info Grid" preview label still says "Dark + Palm Watermark" - palm-bg class removed but label text may need update
- Red Section test at bottom still useful for contrast validation
- Preview labels use hyphens (converted from em dashes) - cosmetic only

### Design System Gaps
- No image/photo component (hero uses inline background-image)
- No form component (DI handles forms natively)
- No video embed component
- Tab component exists in CSS but not fully previewed
- Print styles are minimal

### DI Integration Notes
- DI uses jQuery 1.12.4 - any custom JS must be compatible
- DI uses Bootstrap 3 (some 4) - avoid Bootstrap class conflicts
- sb-* cached CSS may need cache clear after DI-side changes
- Gubagoo chat widget can conflict with bottom-positioned elements
- AudioEye accessibility tool is active - test with it enabled

---

## KEY DEALERSHIP INFO (for page content)

| Field | Value |
|-------|-------|
| Name | Toyota of Coconut Creek |
| Address | 5201 W Sample Rd, Coconut Creek, FL 33073 |
| Phone | 954-448-7257 |
| Owner | Morgan Auto Group |
| Employees | 200+ |
| Languages | English, Spanish, Portuguese, Haitian Creole |
| Tagline | "Home of the $35.55 Full-Synthetic Oil Change" |
| Oil Change Price | $35.55 all-in (no coupon, every day, taxes/fees included) |
| Key Cities | Coconut Creek, Pompano Beach, Coral Springs, Boca Raton, Deerfield Beach, Margate, Parkland, Lauderhill, Tamarac |
| Differentiators | Transparent pricing, no-pressure, salaried sales team, service price match, multilingual, new building coming Q2 2026 |

---

## NEXT SESSION RECOMMENDATIONS

1. **Start building actual pages** - design system is complete and stable
2. **Recommended first page:** Oil Change (/oil-change/) - it's the flagship, uses the most components, and is the strongest SEO play
3. **Second page:** Why Buy (/why-buy/) - showcases the Morgan Auto Group rebrand story
4. **Third page:** About Us (/about-us/) - update the existing page with new ownership info
5. Each page should take ~30-45 min to assemble from existing components + write SEO content
6. Jon will need to provide: real staff photos/names, actual service pricing beyond oil change, leadership team details, any specific offers or promotions to feature

---

*Handoff generated February 4, 2026*
