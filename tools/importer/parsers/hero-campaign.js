/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-campaign
 * Base block: hero
 * Source: https://www.ford.com/
 * Selector: section.billboard[data-section='hero']
 * Generated: 2026-05-26
 *
 * Extracts a full-bleed campaign hero with:
 * - Row 1: Background image (picture element)
 * - Row 2: Heading (eyebrow span + main heading text) and disclosure text
 * - Row 3: CTA links (primary link + secondary video button)
 */
export default function parse(element, { document }) {
  // Extract background image (picture element or fallback to img)
  const bgImage = element.querySelector(':scope > picture, :scope > img, .billboard picture, picture');

  // Extract content container
  const content = element.querySelector(':scope > div.content, :scope > .content, :scope > div');

  // Extract heading (h1 with eyebrow span, fallback to h2/h3)
  const heading = element.querySelector('h1, h2, h3, [class*="heading"], [class*="title"]');

  // Extract disclosure/offer details text (p with sup, or standalone p after heading)
  const disclosure = element.querySelector('p sup, p.disclosure, p.offer-details');
  const disclosureParent = disclosure ? disclosure.closest('p') : null;

  // Extract primary CTA link
  const primaryCta = element.querySelector('a[href], .content a, div.content a');

  // Extract secondary CTA (button element for video)
  const secondaryCta = element.querySelector('button, a.video-cta, [class*="video"]');

  // Build cells array matching target table structure
  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Heading with eyebrow + disclosure text
  const headingCell = [];
  if (heading) {
    headingCell.push(heading);
  }
  if (disclosureParent) {
    headingCell.push(disclosureParent);
  }
  if (headingCell.length > 0) {
    cells.push(headingCell);
  }

  // Row 3: CTA links
  const ctaCell = [];
  if (primaryCta) {
    ctaCell.push(primaryCta);
  }
  if (secondaryCta && secondaryCta !== primaryCta) {
    ctaCell.push(secondaryCta);
  }
  if (ctaCell.length > 0) {
    cells.push(ctaCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-campaign', cells });
  element.replaceWith(block);
}
