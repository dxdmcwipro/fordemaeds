/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-awards
 * Base block: carousel
 * Source selector: section.awards .carousel
 * Target structure: One row per award slide — Col 1: Image, Col 2: Title + subtitle + CTA link
 * Generated: 2026-05-26
 */
export default function parse(element, { document }) {
  // Each award card is a slide in the carousel
  const cards = element.querySelectorAll(':scope > .award-card');

  const cells = [];

  cards.forEach((card) => {
    // Col 1: Vehicle image
    const image = card.querySelector('img');

    // Col 2: Title (button text) + optional subtitle (paragraph) + CTA link
    const subtitle = card.querySelector('p');
    const titleButton = card.querySelector('button');
    const ctaLink = card.querySelector('a');

    const contentCell = [];

    // Award title from button text — create as heading for semantic weight
    if (titleButton) {
      const heading = document.createElement('h3');
      heading.textContent = titleButton.textContent;
      contentCell.push(heading);
    }

    // Optional subtitle (vehicle name)
    if (subtitle) {
      contentCell.push(subtitle);
    }

    // CTA link
    if (ctaLink) {
      contentCell.push(ctaLink);
    }

    cells.push([image || '', contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-awards', cells });
  element.replaceWith(block);
}
