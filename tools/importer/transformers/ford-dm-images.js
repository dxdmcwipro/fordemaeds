/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Ford.com Dynamic Media images.
 * Converts DM <img> tags into anchors that round-trip through markdown intact.
 * Runs in afterTransform only (block parsers need <img> during parsing).
 *
 * Ford uses DM Open API via vanity domain: www.assets.ford.com/adobe/assets/urn:aaid:aem:...
 * Extended detection covers both canonical delivery-p*-e* hostnames and Ford's vanity CNAME.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

// ---- Begin canonical helpers (from dm-scene7-helpers.js, extended for Ford vanity domain) ----
function detectDynamicMediaUrl(urlStr) {
  let u;
  try { u = new URL(urlStr, 'https://x/'); } catch { return false; }
  // Scene7 detected by path alone — hostname is irrelevant because
  // customer sites routinely CNAME a vanity domain to Scene7.
  if (u.pathname.startsWith('/is/image/')) {
    return 'scene7';
  }
  // DM Open API: canonical delivery tier OR Ford vanity domain (www.assets.ford.com)
  if (u.pathname.startsWith('/adobe/assets/urn:')) {
    if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname)) {
      return 'dm-openapi';
    }
    // Ford.com vanity CNAME for DM Open API
    if (u.hostname === 'www.assets.ford.com') {
      return 'dm-openapi';
    }
  }
  return false;
}

// Walk up from a DM <img> through allow-listed inline wrappers (currently
// just <picture>) to find the carrier anchor for the linked-image round-trip.
const LINKED_DM_INLINE_WRAPPER_TAGS = new Set(['PICTURE']);
const LINKED_DM_WRAPPER_SIBLING_TAGS = new Set(['SOURCE']);
function findLinkedDmCarrier(img) {
  if (!img || !img.parentElement) return null;
  let node = img;
  let parent = img.parentElement;
  while (parent && LINKED_DM_INLINE_WRAPPER_TAGS.has(parent.tagName)) {
    let foundNode = false;
    for (const child of parent.children) {
      if (child === node) {
        foundNode = true;
      } else if (!LINKED_DM_WRAPPER_SIBLING_TAGS.has(child.tagName)) {
        return null;
      }
    }
    if (!foundNode) return null;
    node = parent;
    parent = parent.parentElement;
  }
  if (!parent || parent.tagName !== 'A') return null;
  if (parent.children.length !== 1 || parent.children[0] !== node) return null;
  if (parent.textContent.trim() !== '') return null;
  return parent;
}

const EMPTY_ALT_SENTINEL = 'Image without alt text';

function altToLinkText(alt) {
  return alt || EMPTY_ALT_SENTINEL;
}
// ---- End canonical helpers ----

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) return;
  const doc = element.ownerDocument;

  element.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (!detectDynamicMediaUrl(src)) return;

    const alt = img.getAttribute('alt') || '';

    // Linked image case: stash DM URL in title, keep outer href
    const linkedAnchor = findLinkedDmCarrier(img);
    if (linkedAnchor) {
      linkedAnchor.setAttribute('title', src);
      linkedAnchor.textContent = altToLinkText(alt);
      return;
    }

    // Inside an anchor but not sole-meaningful-child — mixed content, skip
    const parent = img.parentElement;
    if (parent && parent.tagName === 'A') {
      // eslint-disable-next-line no-console
      console.warn('DM image inside mixed-content anchor, skipped:', src);
      return;
    }

    // Unlinked image: create anchor with DM URL as href
    const a = doc.createElement('a');
    a.href = src;
    a.textContent = altToLinkText(alt);
    img.replaceWith(a);
  });
}
