/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Ford.com site-wide cleanup.
 * Removes non-authorable shell content (header, footer, nav, overlays, widgets).
 * Selectors from live Ford.com DOM structure.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent / privacy overlays (Ford uses OneTrust)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '#ot-sdk-btn-floating',
      '.optanon-alert-box-wrapper',
    ]);

    // Remove chat widgets and feedback overlays
    WebImporter.DOMUtils.remove(element, [
      '#kampyleForm',
      '#kampyle-modal',
      '[id^="kampyle"]',
      '.fmc-chat-widget',
      '#medallia-overlay',
    ]);

    // Remove skip-to-content and accessibility helper links (not authorable)
    WebImporter.DOMUtils.remove(element, [
      '.skip-to-main',
      'a[href="#main-content"]',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove global header/navigation (Ford uses .gnf-header / header / nav structures)
    WebImporter.DOMUtils.remove(element, [
      'header',
      '.gnf-header',
      '.fgx-brand-global-nav',
      'nav.main-nav',
      '.global-nav',
      '#header',
    ]);

    // Remove global footer
    WebImporter.DOMUtils.remove(element, [
      'footer',
      '.gnf-footer',
      '.fgx-brand-global-footer',
      '#footer',
    ]);

    // Remove breadcrumbs
    WebImporter.DOMUtils.remove(element, [
      '.breadcrumb',
      '[class*="breadcrumb"]',
      'nav[aria-label="breadcrumb"]',
    ]);

    // Remove utility elements that are not authorable
    WebImporter.DOMUtils.remove(element, [
      'script',
      'noscript',
      'link',
      'iframe',
      'style',
    ]);
  }
}
