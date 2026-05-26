/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-tools
 * Base block: cards
 * Source: https://www.ford.com/
 * Selector: section.buying-a-ford .buying-tools
 * Generated: 2026-05-26
 *
 * Extracts a row of icon + heading + description action items (anchors or buttons)
 * into a cards block with one row per item:
 *   Col 1: Icon image
 *   Col 2: Heading + description + link (if parent is anchor)
 */
export default function parse(element, { document }) {
  // Each action item is either an <a> or <button> direct child
  const items = element.querySelectorAll(':scope > a, :scope > button');

  const cells = [];

  items.forEach((item) => {
    const icon = item.querySelector('img');
    const heading = item.querySelector('h1, h2, h3');
    const description = item.querySelector('p');

    // Col 1: Icon image
    const col1 = [];
    if (icon) {
      col1.push(icon);
    }

    // Col 2: Heading + description + link
    const col2 = [];
    if (heading) {
      col2.push(heading);
    }
    if (description) {
      col2.push(description);
    }

    // If the item is an anchor, include the link
    if (item.tagName === 'A' && item.href) {
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.textContent.trim() || 'Learn More';
      col2.push(link);
    }

    cells.push([col1, col2]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-tools', cells });
  element.replaceWith(block);
}
