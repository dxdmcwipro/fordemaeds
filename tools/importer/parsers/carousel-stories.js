/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-stories
 * Base block: carousel
 * Source: https://www.ford.com/ (section.ford-inspires .carousel)
 * Generated: 2026-05-26
 *
 * Extracts news/stories carousel slides. Each slide has a background image,
 * a title (displayed as a button in source but rendered as heading),
 * and one or more CTA links/buttons (Learn More, Watch Now, or anchor links).
 *
 * Target structure (one row per slide):
 *   Col 1: Image
 *   Col 2: Title (as heading) + CTA links/buttons
 */
export default function parse(element, { document }) {
  // Select all slide cards - validated against source: div.inspires-card
  const slides = element.querySelectorAll(':scope > .inspires-card, :scope > [class*="card"]');

  const cells = [];

  slides.forEach((slide) => {
    // Col 1: Image - validated against source: img within .inspires-card
    const img = slide.querySelector('img');

    // Col 2: Title + CTAs
    // In source HTML, the first <button> is the title text (not a real action button)
    // Subsequent <button> and <a> elements are actual CTAs
    const buttons = Array.from(slide.querySelectorAll('button'));
    const links = Array.from(slide.querySelectorAll('a'));

    // First button is the title - convert to heading
    const titleButton = buttons.length > 0 ? buttons[0] : null;
    const contentCell = [];

    if (titleButton) {
      const heading = document.createElement('h3');
      heading.textContent = titleButton.textContent.trim();
      contentCell.push(heading);
    }

    // Remaining buttons (index 1+) are CTAs
    const ctaButtons = buttons.slice(1);
    ctaButtons.forEach((btn) => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = btn.textContent.trim();
      contentCell.push(link);
    });

    // Any <a> elements are also CTAs (e.g., "See the Race" with real href)
    links.forEach((link) => {
      contentCell.push(link);
    });

    // Build row: [image, content]
    const imageCell = img ? [img] : [];
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-stories', cells });
  element.replaceWith(block);
}
