# Ford.com Homepage Migration to AEM Edge Delivery Services

## Overview

Migrate the Ford.com homepage (`https://www.ford.com/`) to AEM Edge Delivery Services, including full content analysis, block mapping, import infrastructure, content generation, and pixel-perfect design migration.

**Source URL:** https://www.ford.com/  
**Scope:** Homepage only  
**Design:** Full design migration (design system already extracted)

## Current State

### Completed
- Design system extracted (`styles/brand.css`, `styles/styles.css`, `styles/fonts.css`)
- Ford F1 fonts downloaded locally (5 weights)
- Brand tokens defined (colors, typography, spacing, buttons)
- Favicon installed

### Available Blocks (from boilerplate)
- `hero`, `columns`, `cards`, `header`, `footer`, `fragment`

### Missing Infrastructure
- No `tools/importer/` directory (no parsers/transformers)
- No `content/` directory (no migrated content)
- No `page-templates.json` (no page template definitions)

## Page Structure Analysis (from Ford.com)

Based on the earlier page snapshot, the Ford homepage contains these major sections:

| # | Section | Content Type | Likely EDS Block |
|---|---------|-------------|-----------------|
| 1 | Hero Banner | Full-width image + headline + CTA | `hero` (variant: full-bleed) |
| 2 | Featured Offers | Heading + carousel of vehicle offer cards | `carousel` (new) or `cards` variant |
| 3 | Highlights Carousel | 3-slide carousel with video/image + text + CTAs | `carousel` (new) |
| 4 | Find Your Ford | Heading + 3-segment vehicle category cards w/ video | `cards` variant or `tabs` |
| 5 | Awards Carousel | Vehicle awards carousel | `carousel` variant |
| 6 | Technology Tabs | Tabbed content with video panels | `tabs` (new) |
| 7 | Buying A Ford | Build & Price card + action links | `cards` or `columns` |
| 8 | Buying Actions | 3 action tiles (Find Dealer, Pre-Qualify, Search) | `cards` (icon variant) |
| 9 | Owner Experience | Tabbed image + text content | `tabs` variant |
| 10 | Ford Inspires | Story carousel with images/video | `carousel` variant |
| 11 | Vehicle Spotlight | Image gallery selector | `gallery` (new) |
| 12 | Send Me Updates | CTA banner | `hero` variant or default content |
| 13 | Footer | Multi-column links + social | `footer` |

## Execution Plan

### Phase 1: Page Analysis
Deep-analyse the Ford.com homepage structure, identify all sections, block variants, and authoring decisions. Produce analysis artifacts.

### Phase 2: Block Mapping & Template Creation
Create `page-templates.json` with the homepage template, map DOM selectors to EDS blocks, and identify which blocks need new variants vs. existing ones.

### Phase 3: Import Infrastructure
Generate import parsers for each block variant and page transformers for sections/metadata/cleanup.

### Phase 4: Content Import
Run the import pipeline to generate the homepage HTML in `/content/`.

### Phase 5: Block Development
Create any new blocks or variants needed (carousel, tabs, gallery) with JavaScript decoration.

### Phase 6: Block Design Migration
Apply pixel-perfect styling to each block using the `excat-block-design-expert` sub-agent, matching Ford.com's visual appearance.

### Phase 7: Verification
Full-page visual comparison between migrated page and original Ford.com.

## Checklist

- [ ] **Phase 1: Page Analysis** — Run `excat:excat-page-analysis` on https://www.ford.com/
- [ ] **Phase 2a: Block Mapping** — Create page-templates.json with homepage template and block selectors
- [ ] **Phase 2b: Variant Identification** — Identify new blocks needed (carousel, tabs, gallery) vs existing (hero, cards, columns)
- [ ] **Phase 3a: Import Parsers** — Generate parsers for each block variant (hero, carousel, tabs, cards, gallery, etc.)
- [ ] **Phase 3b: Import Transformers** — Generate cleanup, sections, and metadata transformers
- [ ] **Phase 3c: Import Script** — Bundle parsers + transformers into executable import script
- [ ] **Phase 4: Content Import** — Execute import to generate `/content/index.html`
- [ ] **Phase 5a: New Block Development** — Create carousel block (JS + CSS)
- [ ] **Phase 5b: New Block Development** — Create tabs block (JS + CSS)
- [ ] **Phase 5c: New Block Development** — Create gallery block (JS + CSS)
- [ ] **Phase 5d: Block Variant Updates** — Update hero, cards blocks for Ford-specific variants
- [ ] **Phase 6: Design Migration** — Run block design expert on all blocks for pixel-perfect styling
- [ ] **Phase 7: Visual Verification** — Full-page screenshot comparison and iteration

## Risks & Considerations

- **Dynamic content:** Featured Offers section loads ZIP-code-based pricing dynamically — will capture static snapshot
- **Video content:** Multiple video players on page — will reference as placeholder images with video links
- **Carousel complexity:** Ford uses custom carousels with mixed media — EDS carousel block needs careful content modelling
- **Font licensing:** Ford F1 is proprietary — fonts are self-hosted from ford.com CDN (already downloaded)
- **Cookie banner:** Will not migrate consent management UI

## Estimated Effort

| Phase | Complexity | Notes |
|-------|-----------|-------|
| Analysis | Medium | Complex page with many section types |
| Import Infrastructure | High | ~8 block parsers + 3 transformers |
| Block Development | High | 3 new blocks + variants |
| Design Migration | High | 10+ blocks need styling |
| **Total** | **High** | Full homepage is content-rich with diverse patterns |

---

*To begin execution, switch to Execute mode. The plan will be implemented using the `excat:excat-site-migration` skill for orchestrated migration.*
