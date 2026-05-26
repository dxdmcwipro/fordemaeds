/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Ford.com section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks where style is defined.
 * Selectors from captured DOM: section[data-section="..."] elements.
 * Runs in afterTransform only.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };

    // Map section numbers to their selectors (from captured DOM)
    const sectionSelectors = [
      { sectionNumber: 1, selector: 'section[data-section="hero"]' },
      { sectionNumber: 2, selector: 'section[data-section="featured-offers"]' },
      { sectionNumber: 3, selector: 'section[data-section="highlights"]' },
      { sectionNumber: 4, selector: 'section[data-section="find-your-ford"]' },
      { sectionNumber: 5, selector: 'section[data-section="awards"]' },
      { sectionNumber: 6, selector: 'section[data-section="technology"]' },
      { sectionNumber: 7, selector: 'section[data-section="buying-a-ford"]' },
      { sectionNumber: 8, selector: 'section[data-section="owner-experience"]' },
      { sectionNumber: 9, selector: 'section[data-section="ford-inspires"]' },
      { sectionNumber: 10, selector: 'section[data-section="vehicle-spotlight"]' },
      { sectionNumber: 11, selector: 'section[data-section="send-me-updates"]' },
    ];

    // Process sections in reverse order to avoid DOM position shifts
    const reversedSections = [...template.sections].sort((a, b) => b.sectionNumber - a.sectionNumber);

    for (const section of reversedSections) {
      const selectorEntry = sectionSelectors.find((s) => s.sectionNumber === section.sectionNumber);
      if (!selectorEntry) continue;

      const sectionEl = element.querySelector(selectorEntry.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.metadata && section.metadata.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.metadata.style },
        });
        sectionEl.append(metaBlock);
      }

      // Insert <hr> before each section except the first
      if (section.sectionNumber > 1) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
