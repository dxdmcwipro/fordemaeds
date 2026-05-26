/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-media variant.
 * Base block: tabs
 * Source: https://www.ford.com/
 * Selector: section.technology .tabs
 *
 * Source structure:
 * - .tabs container with .tab elements (each has h3 or p for label, data-tab attribute)
 * - .tab-content sibling container with .tab-panel elements (each has p + img, data-panel attribute)
 *
 * Target structure (one row per tab):
 * - Col 1: Tab label (heading text)
 * - Col 2: Tab content (description paragraph + image)
 */
export default function parse(element, { document }) {
  // The element is the .tabs container; the .tab-content is its next sibling
  const tabs = Array.from(element.querySelectorAll(':scope > .tab'));
  const tabContentContainer = element.nextElementSibling && element.nextElementSibling.classList.contains('tab-content')
    ? element.nextElementSibling
    : element.parentElement.querySelector('.tab-content');

  const cells = [];

  tabs.forEach((tab) => {
    const tabKey = tab.getAttribute('data-tab');

    // Extract label: could be h3, h2, h4, or p inside the tab
    const labelEl = tab.querySelector('h1, h2, h3, h4, h5, h6, p');
    const labelText = labelEl ? labelEl.textContent.trim() : tab.textContent.trim();

    // Create a heading element for the label cell
    const label = document.createElement('h3');
    label.textContent = labelText;

    // Find matching panel by data-panel attribute
    let panel = null;
    if (tabContentContainer && tabKey) {
      panel = tabContentContainer.querySelector(`.tab-panel[data-panel="${tabKey}"]`);
    }

    // Extract panel content: description paragraph + image
    const contentCell = [];
    if (panel) {
      const description = panel.querySelector('p');
      const image = panel.querySelector('img');

      if (description) {
        const p = document.createElement('p');
        p.textContent = description.textContent.trim();
        contentCell.push(p);
      }
      if (image) {
        const img = document.createElement('img');
        img.src = image.src || image.getAttribute('src');
        img.alt = image.alt || image.getAttribute('alt') || '';
        contentCell.push(img);
      }
    }

    cells.push([label, contentCell.length > 0 ? contentCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-media', cells });

  // Also remove the tab-content sibling since it's now part of the block
  if (tabContentContainer && tabContentContainer.parentElement) {
    tabContentContainer.remove();
  }

  element.replaceWith(block);
}
