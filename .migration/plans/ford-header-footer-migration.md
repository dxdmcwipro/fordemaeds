# Ford.com Header & Footer Migration Plan

## Overview

Migrate the Ford.com header (navigation) and footer to AEM Edge Delivery Services, targeting a da.live project. Extract live navigation structure, create authored content fragments, and implement EDS header/footer blocks matching Ford's visual design and interaction patterns.

**Source:** https://www.ford.com/  
**Target:** AEM EDS (da.live project)  
**Fidelity:** Full navigation with interactive behaviors

## Current State

- **Header block:** Boilerplate EDS header with fragment-loading pattern (`blocks/header/header.js`)
- **Footer block:** Boilerplate EDS footer with fragment-loading pattern (`blocks/footer/footer.js`)  
- **Design system:** Ford F1 font, brand colors (#066fef blue), pill buttons already in place
- **Reference files:** Ford's original minified header/footer JS + CSS provided (clientlib files)

## Source Analysis (from Ford's clientlibs)

### Header Structure
- Fixed position navbar, 56px height
- Ford logo (SVG, navy #00095b)
- Main navigation links (Vehicles, SUVs, Trucks, Electric, etc.)
- Mega-menu flyouts with vehicle grids, tabs, and category tiles
- Mobile hamburger menu (breakpoint: 991px)
- Search bar with typeahead suggestions
- My Account (FMA integration - will be simplified)
- Dealer locator icon link
- Transparent-on-dark theme option with scroll-triggered opacity

### Footer Structure
- Light grey background (#f0f0f0)
- Search bar + popular links row
- Multi-column link grid (All Vehicles, Shop, Finance, Experience Ford, Support)
- Accordion collapse on mobile (991px breakpoint)
- Social media icons row (Facebook, X, YouTube, Instagram, Threads, TikTok)
- Language selector button
- Bottom legal links + copyright
- Disclosures section (expandable)

## Implementation Strategy

### Approach: EDS Content-Driven Pattern

1. **Nav content fragment** (`/nav`) — Authored as structured HTML in da.live with Ford's navigation links
2. **Footer content fragment** (`/footer`) — Authored as structured HTML in da.live with footer columns
3. **Header block JS/CSS** — Enhanced decoration to produce Ford's nav layout from fragment content
4. **Footer block JS/CSS** — Enhanced decoration to produce Ford's footer layout from fragment content

### Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Mega-menus | Simplified dropdown (no vehicle grid) | Vehicle grids require API data; dropdowns with links are authorable |
| Search | Omit initially | Requires backend search service integration |
| My Account | Omit (link to ford.com/login) | FMA auth system is Ford-proprietary |
| Mobile menu | Full slide-in panel | Matches Ford pattern, achievable in EDS |
| Footer columns | Accordion on mobile | Standard Ford pattern, pure CSS/JS |
| Language selector | Omit (single language) | Complex modal with multi-domain logic |

## Execution Steps

### Phase 1: Scrape Navigation & Footer Content

1. Navigate to Ford.com with Playwright
2. Extract header navigation structure (main links + dropdown items)
3. Extract footer link columns, social links, and legal text
4. Save scraped content for authoring

### Phase 2: Create Content Fragments

1. Create `/content/nav.plain.html` with Ford navigation structure
   - Section 1: Brand logo (Ford SVG or image)
   - Section 2: Navigation links (ul > li with nested ul for dropdowns)
   - Section 3: Tools (dealer link, login link)
2. Create `/content/footer.plain.html` with Ford footer structure
   - Section 1: Footer link columns (5 groups)
   - Section 2: Social media links
   - Section 3: Legal links + copyright

### Phase 3: Header Block Development

1. Update `blocks/header/header.css` with Ford styling:
   - White background, 56px height, fixed position
   - Ford navy logo color (#00095b)
   - Nav links: 16px FordFont, weight 500, #333 color
   - Dropdown: white bg, border-radius 0 0 10px 10px, shadow
   - Mobile: slide-in panel, full height, 991px breakpoint
   - Hamburger: animated three-line to X transition
2. Update `blocks/header/header.js` with Ford behaviors:
   - Scroll-triggered sticky with background transition
   - Dropdown open on click (desktop) with scrim overlay
   - Mobile hamburger toggle with slide animation
   - Close on Escape, click outside, focus lost

### Phase 4: Footer Block Development

1. Update `blocks/footer/footer.css` with Ford styling:
   - Background: #f0f0f0
   - 5-column grid layout (desktop), stack on mobile
   - Accordion with plus/minus icons on mobile
   - Social icons: navy (#00095b), 24px
   - Legal links: 11px, #5e5e5e color
   - Section borders: 1px solid #9c9c9c
2. Update `blocks/footer/footer.js` with Ford behaviors:
   - Mobile accordion expand/collapse
   - Footer columns auto-detected from authored content structure

### Phase 5: Visual Verification

1. Preview header + footer with page content
2. Compare desktop and mobile views with Ford.com
3. Verify interactive behaviors (hamburger, dropdowns, accordion)

## Checklist

- [ ] Scrape Ford.com header navigation links and structure via Playwright
- [ ] Scrape Ford.com footer link columns, social links, and legal text
- [ ] Create `content/nav.plain.html` with authored Ford navigation content
- [ ] Create `content/footer.plain.html` with authored Ford footer content  
- [ ] Update `blocks/header/header.css` with Ford header styling (fixed nav, logo, dropdowns, mobile menu)
- [ ] Update `blocks/header/header.js` with Ford header behaviors (scroll, dropdowns, hamburger, keyboard)
- [ ] Update `blocks/footer/footer.css` with Ford footer styling (columns, accordion, social, legal)
- [ ] Update `blocks/footer/footer.js` with Ford footer behaviors (mobile accordion)
- [ ] Download Ford logo SVG and add to `/icons/` directory
- [ ] Download social media icon SVGs (Facebook, X, YouTube, Instagram, Threads, TikTok)
- [ ] Verify header renders correctly at desktop (>991px) and mobile (<991px)
- [ ] Verify footer renders correctly with accordion behavior on mobile
- [ ] Run linting (`npm run lint`) and fix any issues

## File Changes Summary

| File | Action | Purpose |
|------|--------|---------|
| `content/nav.plain.html` | Create | Navigation content fragment |
| `content/footer.plain.html` | Create | Footer content fragment |
| `blocks/header/header.js` | Update | Ford nav decoration logic |
| `blocks/header/header.css` | Update | Ford nav styling |
| `blocks/footer/footer.js` | Update | Ford footer decoration logic |
| `blocks/footer/footer.css` | Update | Ford footer styling |
| `icons/ford-logo.svg` | Create | Ford brand logo |
| `icons/facebook.svg` | Create | Social icon |
| `icons/x-twitter.svg` | Create | Social icon |
| `icons/youtube.svg` | Create | Social icon |
| `icons/instagram.svg` | Create | Social icon |
| `icons/tiktok.svg` | Create | Social icon |

## Risks & Mitigations

- **Dynamic content in mega-menus:** Ford's nav loads vehicle prices/images from APIs — we'll use static authored links
- **FMA authentication:** Proprietary Ford system — replaced with simple login/register links  
- **Search typeahead:** Requires search service — omitted from initial implementation
- **Cookie consent/disclosures:** Ford-specific global disclosure system — simplified to static text if needed

---

*Execution requires switching to Execute mode. The implementation will use the navigation orchestrator skill for the header and footer orchestrator skill for the footer, leveraging the reference CSS/JS provided.*
