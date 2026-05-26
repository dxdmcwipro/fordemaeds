/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-offers
 * Base block: carousel
 * Source: https://www.ford.com/
 * Selector: section.featured-offers .carousel
 * Generated: 2026-05-26
 *
 * Extracts vehicle offer cards from a horizontal carousel.
 * Each card has: image, vehicle name, offer details (type, price, terms), CTAs, optional date.
 * Produces one row per slide: Col 1 = image, Col 2 = vehicle name + offer details + CTAs.
 */
export default function parse(element, { document }) {
  // Select all offer card slides within the carousel
  const cards = element.querySelectorAll(':scope > .offer-card, :scope > div[class*="card"], :scope > div');

  const cells = [];

  cards.forEach((card) => {
    // Col 1: Campaign image
    const img = card.querySelector('img');

    // Col 2: Vehicle name + offer details + CTAs
    const contentCell = [];

    // Vehicle name heading (h5 in source, may vary)
    const heading = card.querySelector('h5, h4, h3, h2, [class*="vehicle-name"]');
    if (heading) contentCell.push(heading);

    // Offer details container
    const offerDetails = card.querySelector('.offer-details, [class*="offer-detail"], [class*="pricing"]');
    if (offerDetails) {
      // Extract offer type
      const offerType = offerDetails.querySelector('.offer-type, [class*="offer-type"]');
      if (offerType) contentCell.push(offerType);

      // Extract price
      const price = offerDetails.querySelector('.price, [class*="price"]');
      if (price) contentCell.push(price);

      // Extract remaining terms (spans that are not offer-type or price)
      const terms = offerDetails.querySelectorAll(':scope > span:not(.offer-type):not(.price)');
      terms.forEach((term) => {
        if (term.textContent.trim()) contentCell.push(term);
      });
    }

    // CTA links
    const ctas = card.querySelectorAll(':scope > a, .offer-ctas a, [class*="cta"] a');
    ctas.forEach((cta) => contentCell.push(cta));

    // Optional date stamp (last span child that looks like a date)
    const dateStamp = card.querySelector(':scope > span:last-child');
    if (dateStamp && dateStamp.textContent.trim() && !dateStamp.closest('.offer-details')) {
      contentCell.push(dateStamp);
    }

    // Build row: [image cell, content cell]
    if (img || contentCell.length > 0) {
      cells.push([img || '', contentCell.length > 0 ? contentCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-offers', cells });
  element.replaceWith(block);
}
