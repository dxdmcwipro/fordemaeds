/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroCampaignParser from './parsers/hero-campaign.js';
import carouselOffersParser from './parsers/carousel-offers.js';
import carouselHighlightsParser from './parsers/carousel-highlights.js';
import carouselCategoryParser from './parsers/carousel-category.js';
import carouselAwardsParser from './parsers/carousel-awards.js';
import carouselStoriesParser from './parsers/carousel-stories.js';
import tabsMediaParser from './parsers/tabs-media.js';
import tabsVerticalParser from './parsers/tabs-vertical.js';
import cardsFeaturedParser from './parsers/cards-featured.js';
import cardsToolsParser from './parsers/cards-tools.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import cardsCtaParser from './parsers/cards-cta.js';

// TRANSFORMER IMPORTS
import fordCleanupTransformer from './transformers/ford-cleanup.js';
import fordDmImagesTransformer from './transformers/ford-dm-images.js';
import fordSectionsTransformer from './transformers/ford-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-campaign': heroCampaignParser,
  'carousel-offers': carouselOffersParser,
  'carousel-highlights': carouselHighlightsParser,
  'carousel-category': carouselCategoryParser,
  'carousel-awards': carouselAwardsParser,
  'carousel-stories': carouselStoriesParser,
  'tabs-media': tabsMediaParser,
  'tabs-vertical': tabsVerticalParser,
  'cards-featured': cardsFeaturedParser,
  'cards-tools': cardsToolsParser,
  'cards-gallery': cardsGalleryParser,
  'cards-cta': cardsCtaParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  fordCleanupTransformer,
  fordDmImagesTransformer,
  fordSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Ford.com homepage with hero, carousels, tabs, cards, and CTA sections',
  urls: ['https://www.ford.com/'],
  blocks: [
    {
      name: 'hero-campaign',
      instances: [{ selector: "section.billboard[data-section='hero']" }],
    },
    {
      name: 'carousel-offers',
      instances: [{ selector: 'section.featured-offers .carousel' }],
    },
    {
      name: 'carousel-highlights',
      instances: [{ selector: 'section.highlights .carousel' }],
    },
    {
      name: 'carousel-category',
      instances: [{ selector: 'section.find-your-ford .carousel' }],
    },
    {
      name: 'carousel-awards',
      instances: [{ selector: 'section.awards .carousel' }],
    },
    {
      name: 'tabs-media',
      instances: [{ selector: 'section.technology .tabs' }],
    },
    {
      name: 'cards-featured',
      instances: [{ selector: 'section.buying-a-ford .build-price-card' }],
    },
    {
      name: 'cards-tools',
      instances: [{ selector: 'section.buying-a-ford .buying-tools' }],
    },
    {
      name: 'tabs-vertical',
      instances: [{ selector: 'section.owner-experience' }],
    },
    {
      name: 'carousel-stories',
      instances: [{ selector: 'section.ford-inspires .carousel' }],
    },
    {
      name: 'cards-gallery',
      instances: [{ selector: 'section.vehicle-spotlight .gallery' }],
    },
    {
      name: 'cards-cta',
      instances: [{ selector: 'section.send-me-updates button' }],
    },
  ],
  sections: [
    { sectionNumber: 1, name: 'Hero Billboard', metadata: null, defaultContent: [] },
    { sectionNumber: 2, name: 'Featured Offers', metadata: null, defaultContent: ['section.featured-offers > h2', 'section.featured-offers > p'] },
    { sectionNumber: 3, name: 'Highlights Carousel', metadata: null, defaultContent: [] },
    { sectionNumber: 4, name: 'Find Your Ford', metadata: null, defaultContent: ['section.find-your-ford > p.eyebrow', 'section.find-your-ford > h1'] },
    { sectionNumber: 5, name: 'Awards Carousel', metadata: null, defaultContent: [] },
    { sectionNumber: 6, name: 'Technology', metadata: null, defaultContent: ['section.technology > h2', 'section.technology > p', 'section.technology > a'] },
    { sectionNumber: 7, name: 'Buying A Ford', metadata: null, defaultContent: ['section.buying-a-ford > h2', 'section.buying-a-ford > p'] },
    { sectionNumber: 8, name: 'Owner Experience', metadata: null, defaultContent: [] },
    { sectionNumber: 9, name: 'Ford Inspires', metadata: null, defaultContent: ['section.ford-inspires > p'] },
    { sectionNumber: 10, name: 'Vehicle Spotlight', metadata: { style: 'dark' }, defaultContent: ['section.vehicle-spotlight > h2', 'section.vehicle-spotlight > p'] },
    { sectionNumber: 11, name: 'Send Me Updates', metadata: null, defaultContent: [] },
  ],
};

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
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
      const selector = typeof instance === 'string' ? instance : instance.selector;
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform (cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
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

    // 4. Execute afterTransform (sections, final cleanup)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
