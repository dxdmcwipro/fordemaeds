/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-featured
 * Base block: cards
 * Selector: section.buying-a-ford .build-price-card
 * Generated: 2026-05-26
 *
 * Source structure:
 *   div.build-price-card
 *     img (banner image)
 *     h2 (heading)
 *     p (description)
 *     a (CTA link)
 *
 * Target table:
 *   Row 1: [image] | [heading + description + CTA]
 */
export default function parse(element, { document }) {
  // Extract image (Col 1)
  const image = element.querySelector(':scope > img, :scope img');

  // Extract heading (Col 2)
  const heading = element.querySelector(':scope > h2, :scope > h1, :scope > h3, :scope [class*="title"]');

  // Extract description (Col 2)
  const description = element.querySelector(':scope > p, :scope [class*="description"], :scope [class*="subtitle"]');

  // Extract CTA link (Col 2)
  const cta = element.querySelector(':scope > a, :scope a[href]');

  // Build cells: one row with image in Col 1, content in Col 2
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (cta) contentCell.push(cta);

  const cells = [];
  if (image && contentCell.length > 0) {
    cells.push([image, contentCell]);
  } else if (image) {
    cells.push([image]);
  } else if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-featured', cells });
  element.replaceWith(block);
}
