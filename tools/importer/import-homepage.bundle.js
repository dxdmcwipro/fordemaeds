/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-campaign.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(":scope > picture, :scope > img, .billboard picture, picture");
    const content = element.querySelector(":scope > div.content, :scope > .content, :scope > div");
    const heading = element.querySelector('h1, h2, h3, [class*="heading"], [class*="title"]');
    const disclosure = element.querySelector("p sup, p.disclosure, p.offer-details");
    const disclosureParent = disclosure ? disclosure.closest("p") : null;
    const primaryCta = element.querySelector("a[href], .content a, div.content a");
    const secondaryCta = element.querySelector('button, a.video-cta, [class*="video"]');
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const headingCell = [];
    if (heading) {
      headingCell.push(heading);
    }
    if (disclosureParent) {
      headingCell.push(disclosureParent);
    }
    if (headingCell.length > 0) {
      cells.push(headingCell);
    }
    const ctaCell = [];
    if (primaryCta) {
      ctaCell.push(primaryCta);
    }
    if (secondaryCta && secondaryCta !== primaryCta) {
      ctaCell.push(secondaryCta);
    }
    if (ctaCell.length > 0) {
      cells.push(ctaCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-campaign", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-offers.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(':scope > .offer-card, :scope > div[class*="card"], :scope > div');
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      const contentCell = [];
      const heading = card.querySelector('h5, h4, h3, h2, [class*="vehicle-name"]');
      if (heading) contentCell.push(heading);
      const offerDetails = card.querySelector('.offer-details, [class*="offer-detail"], [class*="pricing"]');
      if (offerDetails) {
        const offerType = offerDetails.querySelector('.offer-type, [class*="offer-type"]');
        if (offerType) contentCell.push(offerType);
        const price = offerDetails.querySelector('.price, [class*="price"]');
        if (price) contentCell.push(price);
        const terms = offerDetails.querySelectorAll(":scope > span:not(.offer-type):not(.price)");
        terms.forEach((term) => {
          if (term.textContent.trim()) contentCell.push(term);
        });
      }
      const ctas = card.querySelectorAll(':scope > a, .offer-ctas a, [class*="cta"] a');
      ctas.forEach((cta) => contentCell.push(cta));
      const dateStamp = card.querySelector(":scope > span:last-child");
      if (dateStamp && dateStamp.textContent.trim() && !dateStamp.closest(".offer-details")) {
        contentCell.push(dateStamp);
      }
      if (img || contentCell.length > 0) {
        cells.push([img || "", contentCell.length > 0 ? contentCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-offers", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-highlights.js
  function parse3(element, { document }) {
    const slides = element.querySelectorAll(".highlight-slide");
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector("img");
      const contentCell = [];
      const titleButton = slide.querySelector("button");
      if (titleButton) {
        const heading = document.createElement("h3");
        heading.textContent = titleButton.textContent.trim();
        contentCell.push(heading);
      }
      const subtitle = slide.querySelector("p");
      if (subtitle) {
        contentCell.push(subtitle);
      }
      const ctaLinks = slide.querySelectorAll("a");
      ctaLinks.forEach((link) => {
        contentCell.push(link);
      });
      cells.push([image || "", contentCell.length > 0 ? contentCell : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-highlights", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-category.js
  function parse4(element, { document }) {
    const cards = element.querySelectorAll('.segment-card, [class*="segment"], .carousel-slide, .card');
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector("img, video, picture");
      const cta = card.querySelector("a");
      if (image || cta) {
        cells.push([image || "", cta || ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-category", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-awards.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(":scope > .award-card");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector("img");
      const subtitle = card.querySelector("p");
      const titleButton = card.querySelector("button");
      const ctaLink = card.querySelector("a");
      const contentCell = [];
      if (titleButton) {
        const heading = document.createElement("h3");
        heading.textContent = titleButton.textContent;
        contentCell.push(heading);
      }
      if (subtitle) {
        contentCell.push(subtitle);
      }
      if (ctaLink) {
        contentCell.push(ctaLink);
      }
      cells.push([image || "", contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-awards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-stories.js
  function parse6(element, { document }) {
    const slides = element.querySelectorAll(':scope > .inspires-card, :scope > [class*="card"]');
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      const buttons = Array.from(slide.querySelectorAll("button"));
      const links = Array.from(slide.querySelectorAll("a"));
      const titleButton = buttons.length > 0 ? buttons[0] : null;
      const contentCell = [];
      if (titleButton) {
        const heading = document.createElement("h3");
        heading.textContent = titleButton.textContent.trim();
        contentCell.push(heading);
      }
      const ctaButtons = buttons.slice(1);
      ctaButtons.forEach((btn) => {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = btn.textContent.trim();
        contentCell.push(link);
      });
      links.forEach((link) => {
        contentCell.push(link);
      });
      const imageCell = img ? [img] : [];
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-stories", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-media.js
  function parse7(element, { document }) {
    const tabs = Array.from(element.querySelectorAll(":scope > .tab"));
    const tabContentContainer = element.nextElementSibling && element.nextElementSibling.classList.contains("tab-content") ? element.nextElementSibling : element.parentElement.querySelector(".tab-content");
    const cells = [];
    tabs.forEach((tab) => {
      const tabKey = tab.getAttribute("data-tab");
      const labelEl = tab.querySelector("h1, h2, h3, h4, h5, h6, p");
      const labelText = labelEl ? labelEl.textContent.trim() : tab.textContent.trim();
      const label = document.createElement("h3");
      label.textContent = labelText;
      let panel = null;
      if (tabContentContainer && tabKey) {
        panel = tabContentContainer.querySelector(`.tab-panel[data-panel="${tabKey}"]`);
      }
      const contentCell = [];
      if (panel) {
        const description = panel.querySelector("p");
        const image = panel.querySelector("img");
        if (description) {
          const p = document.createElement("p");
          p.textContent = description.textContent.trim();
          contentCell.push(p);
        }
        if (image) {
          const img = document.createElement("img");
          img.src = image.src || image.getAttribute("src");
          img.alt = image.alt || image.getAttribute("alt") || "";
          contentCell.push(img);
        }
      }
      cells.push([label, contentCell.length > 0 ? contentCell : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-media", cells });
    if (tabContentContainer && tabContentContainer.parentElement) {
      tabContentContainer.remove();
    }
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-vertical.js
  function parse8(element, { document }) {
    const tabs = Array.from(element.querySelectorAll(".tabs .tab, .tabs [data-tab]"));
    const galleryImages = Array.from(element.querySelectorAll(".media-gallery img"));
    const cells = [];
    tabs.forEach((tab) => {
      const tabId = tab.getAttribute("data-tab");
      const matchedImage = galleryImages.find(
        (img) => img.getAttribute("data-tab") === tabId
      );
      const imageCell = matchedImage || document.createTextNode("");
      const heading = tab.querySelector("h3, h4, h2");
      const description = tab.querySelector("p");
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (description) contentCell.push(description);
      cells.push([imageCell, contentCell.length > 0 ? contentCell : document.createTextNode("")]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-vertical", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-featured.js
  function parse9(element, { document }) {
    const image = element.querySelector(":scope > img, :scope img");
    const heading = element.querySelector(':scope > h2, :scope > h1, :scope > h3, :scope [class*="title"]');
    const description = element.querySelector(':scope > p, :scope [class*="description"], :scope [class*="subtitle"]');
    const cta = element.querySelector(":scope > a, :scope a[href]");
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (cta) contentCell.push(cta);
    const cells = [];
    if (image && contentCell.length > 0) {
      cells.push([image, contentCell]);
    } else if (image) {
      cells.push([image]);
    } else if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-featured", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tools.js
  function parse10(element, { document }) {
    const items = element.querySelectorAll(":scope > a, :scope > button");
    const cells = [];
    items.forEach((item) => {
      const icon = item.querySelector("img");
      const heading = item.querySelector("h1, h2, h3");
      const description = item.querySelector("p");
      const col1 = [];
      if (icon) {
        col1.push(icon);
      }
      const col2 = [];
      if (heading) {
        col2.push(heading);
      }
      if (description) {
        col2.push(description);
      }
      if (item.tagName === "A" && item.href) {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.textContent.trim() || "Learn More";
        col2.push(link);
      }
      cells.push([col1, col2]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-tools", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse11(element, { document }) {
    const images = element.querySelectorAll("img");
    const cells = [];
    images.forEach((img) => {
      const imgEl = img.cloneNode(true);
      const altText = img.getAttribute("alt") || "";
      const altParagraph = document.createElement("p");
      altParagraph.textContent = altText;
      cells.push([imgEl, altParagraph]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-cta.js
  function parse12(element, { document }) {
    const icon = element.querySelector("img");
    const heading = element.querySelector("h2, h1, h3");
    const description = element.querySelector("p");
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    const cells = [];
    if (icon && contentCell.length > 0) {
      cells.push([icon, contentCell]);
    } else if (icon) {
      cells.push([icon]);
    } else if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/ford-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        "#ot-sdk-btn-floating",
        ".optanon-alert-box-wrapper"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#kampyleForm",
        "#kampyle-modal",
        '[id^="kampyle"]',
        ".fmc-chat-widget",
        "#medallia-overlay"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".skip-to-main",
        'a[href="#main-content"]'
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        ".gnf-header",
        ".fgx-brand-global-nav",
        "nav.main-nav",
        ".global-nav",
        "#header"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "footer",
        ".gnf-footer",
        ".fgx-brand-global-footer",
        "#footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".breadcrumb",
        '[class*="breadcrumb"]',
        'nav[aria-label="breadcrumb"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        "script",
        "noscript",
        "link",
        "iframe",
        "style"
      ]);
    }
  }

  // tools/importer/transformers/ford-dm-images.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function detectDynamicMediaUrl(urlStr) {
    let u;
    try {
      u = new URL(urlStr, "https://x/");
    } catch (e) {
      return false;
    }
    if (u.pathname.startsWith("/is/image/")) {
      return "scene7";
    }
    if (u.pathname.startsWith("/adobe/assets/urn:")) {
      if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname)) {
        return "dm-openapi";
      }
      if (u.hostname === "www.assets.ford.com") {
        return "dm-openapi";
      }
    }
    return false;
  }
  var LINKED_DM_INLINE_WRAPPER_TAGS = /* @__PURE__ */ new Set(["PICTURE"]);
  var LINKED_DM_WRAPPER_SIBLING_TAGS = /* @__PURE__ */ new Set(["SOURCE"]);
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
    if (!parent || parent.tagName !== "A") return null;
    if (parent.children.length !== 1 || parent.children[0] !== node) return null;
    if (parent.textContent.trim() !== "") return null;
    return parent;
  }
  var EMPTY_ALT_SENTINEL = "Image without alt text";
  function altToLinkText(alt) {
    return alt || EMPTY_ALT_SENTINEL;
  }
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) return;
    const doc = element.ownerDocument;
    element.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!detectDynamicMediaUrl(src)) return;
      const alt = img.getAttribute("alt") || "";
      const linkedAnchor = findLinkedDmCarrier(img);
      if (linkedAnchor) {
        linkedAnchor.setAttribute("title", src);
        linkedAnchor.textContent = altToLinkText(alt);
        return;
      }
      const parent = img.parentElement;
      if (parent && parent.tagName === "A") {
        console.warn("DM image inside mixed-content anchor, skipped:", src);
        return;
      }
      const a = doc.createElement("a");
      a.href = src;
      a.textContent = altToLinkText(alt);
      img.replaceWith(a);
    });
  }

  // tools/importer/transformers/ford-sections.js
  var TransformHook3 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform3(hookName, element, payload) {
    if (hookName === TransformHook3.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
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
        { sectionNumber: 11, selector: 'section[data-section="send-me-updates"]' }
      ];
      const reversedSections = [...template.sections].sort((a, b) => b.sectionNumber - a.sectionNumber);
      for (const section of reversedSections) {
        const selectorEntry = sectionSelectors.find((s) => s.sectionNumber === section.sectionNumber);
        if (!selectorEntry) continue;
        const sectionEl = element.querySelector(selectorEntry.selector);
        if (!sectionEl) continue;
        if (section.metadata && section.metadata.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.metadata.style }
          });
          sectionEl.append(metaBlock);
        }
        if (section.sectionNumber > 1) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-campaign": parse,
    "carousel-offers": parse2,
    "carousel-highlights": parse3,
    "carousel-category": parse4,
    "carousel-awards": parse5,
    "carousel-stories": parse6,
    "tabs-media": parse7,
    "tabs-vertical": parse8,
    "cards-featured": parse9,
    "cards-tools": parse10,
    "cards-gallery": parse11,
    "cards-cta": parse12
  };
  var transformers = [
    transform,
    transform2,
    transform3
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Ford.com homepage with hero, carousels, tabs, cards, and CTA sections",
    urls: ["https://www.ford.com/"],
    blocks: [
      {
        name: "hero-campaign",
        instances: [{ selector: "section.billboard[data-section='hero']" }]
      },
      {
        name: "carousel-offers",
        instances: [{ selector: "section.featured-offers .carousel" }]
      },
      {
        name: "carousel-highlights",
        instances: [{ selector: "section.highlights .carousel" }]
      },
      {
        name: "carousel-category",
        instances: [{ selector: "section.find-your-ford .carousel" }]
      },
      {
        name: "carousel-awards",
        instances: [{ selector: "section.awards .carousel" }]
      },
      {
        name: "tabs-media",
        instances: [{ selector: "section.technology .tabs" }]
      },
      {
        name: "cards-featured",
        instances: [{ selector: "section.buying-a-ford .build-price-card" }]
      },
      {
        name: "cards-tools",
        instances: [{ selector: "section.buying-a-ford .buying-tools" }]
      },
      {
        name: "tabs-vertical",
        instances: [{ selector: "section.owner-experience" }]
      },
      {
        name: "carousel-stories",
        instances: [{ selector: "section.ford-inspires .carousel" }]
      },
      {
        name: "cards-gallery",
        instances: [{ selector: "section.vehicle-spotlight .gallery" }]
      },
      {
        name: "cards-cta",
        instances: [{ selector: "section.send-me-updates button" }]
      }
    ],
    sections: [
      { sectionNumber: 1, name: "Hero Billboard", metadata: null, defaultContent: [] },
      { sectionNumber: 2, name: "Featured Offers", metadata: null, defaultContent: ["section.featured-offers > h2", "section.featured-offers > p"] },
      { sectionNumber: 3, name: "Highlights Carousel", metadata: null, defaultContent: [] },
      { sectionNumber: 4, name: "Find Your Ford", metadata: null, defaultContent: ["section.find-your-ford > p.eyebrow", "section.find-your-ford > h1"] },
      { sectionNumber: 5, name: "Awards Carousel", metadata: null, defaultContent: [] },
      { sectionNumber: 6, name: "Technology", metadata: null, defaultContent: ["section.technology > h2", "section.technology > p", "section.technology > a"] },
      { sectionNumber: 7, name: "Buying A Ford", metadata: null, defaultContent: ["section.buying-a-ford > h2", "section.buying-a-ford > p"] },
      { sectionNumber: 8, name: "Owner Experience", metadata: null, defaultContent: [] },
      { sectionNumber: 9, name: "Ford Inspires", metadata: null, defaultContent: ["section.ford-inspires > p"] },
      { sectionNumber: 10, name: "Vehicle Spotlight", metadata: { style: "dark" }, defaultContent: ["section.vehicle-spotlight > h2", "section.vehicle-spotlight > p"] },
      { sectionNumber: 11, name: "Send Me Updates", metadata: null, defaultContent: [] }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((instance) => {
        const selector = typeof instance === "string" ? instance : instance.selector;
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
