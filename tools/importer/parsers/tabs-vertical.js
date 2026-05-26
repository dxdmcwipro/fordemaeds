/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-vertical
 * Base block: tabs
 * Source: https://www.ford.com/
 * Selector: section.owner-experience
 * Generated: 2026-05-26
 *
 * Extracts an owner experience section with:
 * - Media gallery images matched to tabs via data-tab attribute
 * - Tab headings (h3) and optional descriptions (p)
 * Produces one row per tab: [image, heading + description]
 */
export default function parse(element, { document }) {
  // Extract all tab items from the .tabs container
  const tabs = Array.from(element.querySelectorAll('.tabs .tab, .tabs [data-tab]'));

  // Extract all gallery images from .media-gallery
  const galleryImages = Array.from(element.querySelectorAll('.media-gallery img'));

  const cells = [];

  tabs.forEach((tab) => {
    const tabId = tab.getAttribute('data-tab');

    // Col 1: Find associated image by matching data-tab attribute
    const matchedImage = galleryImages.find(
      (img) => img.getAttribute('data-tab') === tabId,
    );
    const imageCell = matchedImage || document.createTextNode('');

    // Col 2: Tab heading (h3) + optional description (p)
    const heading = tab.querySelector('h3, h4, h2');
    const description = tab.querySelector('p');
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);

    cells.push([imageCell, contentCell.length > 0 ? contentCell : document.createTextNode('')]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-vertical', cells });
  element.replaceWith(block);
}
