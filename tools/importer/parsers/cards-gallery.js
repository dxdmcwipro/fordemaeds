/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery
 * Base block: cards
 * Source selector: section.vehicle-spotlight .gallery
 * Description: Image-only mosaic gallery of vehicle spotlight photos.
 *   Produces one row per image with the image element in col 1
 *   and the alt text as a paragraph in col 2.
 */
export default function parse(element, { document }) {
  // Extract all images within the gallery (may be wrapped in buttons or standalone)
  const images = element.querySelectorAll('img');

  const cells = [];

  images.forEach((img) => {
    // Col 1: the image element itself
    const imgEl = img.cloneNode(true);

    // Col 2: alt text as a paragraph for accessible authoring description
    const altText = img.getAttribute('alt') || '';
    const altParagraph = document.createElement('p');
    altParagraph.textContent = altText;

    cells.push([imgEl, altParagraph]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
