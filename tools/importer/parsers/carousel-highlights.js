/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-highlights
 * Base block: carousel
 * Source selector: section.highlights .carousel
 * Generated: 2026-05-26
 *
 * Extracts full-width rotating highlight slides into a Carousel (Highlights) block.
 * Each slide produces one row: Col 1 = image, Col 2 = title + subtitle + CTA links.
 *
 * Source structure per slide (div.highlight-slide):
 *   - img (background/hero image)
 *   - p (subtitle, optional)
 *   - button (title text, optional)
 *   - a (one or two CTA links)
 */
export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.highlight-slide');
  const cells = [];

  slides.forEach((slide) => {
    // Col 1: Image
    const image = slide.querySelector('img');

    // Col 2: Title (from button) + subtitle (from p) + CTA links (from a)
    const contentCell = [];

    // Title comes from the button element (clickable expand/collapse trigger)
    const titleButton = slide.querySelector('button');
    if (titleButton) {
      const heading = document.createElement('h3');
      heading.textContent = titleButton.textContent.trim();
      contentCell.push(heading);
    }

    // Subtitle paragraph
    const subtitle = slide.querySelector('p');
    if (subtitle) {
      contentCell.push(subtitle);
    }

    // CTA links (one or two per slide)
    const ctaLinks = slide.querySelectorAll('a');
    ctaLinks.forEach((link) => {
      contentCell.push(link);
    });

    // Build row: [image, content]
    cells.push([image || '', contentCell.length > 0 ? contentCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-highlights', cells });
  element.replaceWith(block);
}
