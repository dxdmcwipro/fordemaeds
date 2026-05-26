/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-cta variant.
 * Base block: cards
 * Source selector: section.send-me-updates button
 * Structure: Single CTA card with icon, heading, and description.
 * Target: One row — Col 1: icon image, Col 2: heading + description.
 */
export default function parse(element, { document }) {
  // Extract icon image (SVG or any img)
  const icon = element.querySelector('img');

  // Extract heading (h2 in source, fallback to h1/h3)
  const heading = element.querySelector('h2, h1, h3');

  // Extract description paragraph
  const description = element.querySelector('p');

  // Build content cell (heading + description)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);

  // Build cells: one row with [icon, content]
  const cells = [];
  if (icon && contentCell.length > 0) {
    cells.push([icon, contentCell]);
  } else if (icon) {
    cells.push([icon]);
  } else if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-cta', cells });
  element.replaceWith(block);
}
