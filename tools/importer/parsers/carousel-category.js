/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-category
 * Base block: carousel
 * Source: https://www.ford.com/
 * Selector: section.find-your-ford .carousel
 * Description: Vehicle category cards carousel. Each card has a category image
 * and a "Learn More" CTA link. One row per slide: Col 1 = image, Col 2 = CTA link.
 * Generated: 2026-05-26
 */
export default function parse(element, { document }) {
  // Each slide is a .segment-card with an image and a CTA link
  const cards = element.querySelectorAll('.segment-card, [class*="segment"], .carousel-slide, .card');

  const cells = [];

  cards.forEach((card) => {
    // Extract image (video poster fallback)
    const image = card.querySelector('img, video, picture');

    // Extract CTA link
    const cta = card.querySelector('a');

    if (image || cta) {
      cells.push([image || '', cta || '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-category', cells });
  element.replaceWith(block);
}
