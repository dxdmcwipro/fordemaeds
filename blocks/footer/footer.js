import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function buildFooterColumns(container) {
  const sections = container.querySelectorAll(':scope > div');
  if (sections.length < 1) return;

  const columnsSection = sections[0];
  const headings = columnsSection.querySelectorAll('h2');
  if (headings.length === 0) return;

  const columnsWrapper = document.createElement('div');
  columnsWrapper.className = 'footer-columns';

  headings.forEach((heading) => {
    const column = document.createElement('div');
    column.className = 'footer-column';

    const toggle = document.createElement('button');
    toggle.className = 'footer-column-toggle';
    toggle.textContent = heading.textContent;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const isExpanded = column.getAttribute('aria-expanded') === 'true';
      container.querySelectorAll('.footer-column[aria-expanded="true"]').forEach((col) => {
        col.setAttribute('aria-expanded', 'false');
        col.querySelector('.footer-column-toggle').setAttribute('aria-expanded', 'false');
      });
      if (!isExpanded) {
        column.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    column.append(toggle);
    column.append(heading);

    let sibling = heading.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      const next = sibling.nextElementSibling;
      column.append(sibling);
      sibling = next;
    }

    columnsWrapper.append(column);
  });

  columnsSection.replaceWith(columnsWrapper);
}

function buildFooterSocial(container) {
  const sections = container.querySelectorAll(':scope > div');
  if (sections.length < 2) return;

  const socialSection = sections[1];
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-social';

  const headingEl = socialSection.querySelector('p');
  if (headingEl) {
    const heading = document.createElement('p');
    heading.className = 'footer-social-heading';
    heading.textContent = headingEl.textContent;
    wrapper.append(heading);
  }

  const list = socialSection.querySelector('ul');
  if (list) {
    list.className = 'footer-social-links';
    wrapper.append(list);
  }

  socialSection.replaceWith(wrapper);
}

function buildFooterLegal(container) {
  const sections = container.querySelectorAll(':scope > div');
  if (sections.length < 3) return;

  const legalSection = sections[2];
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-legal';

  const copyright = legalSection.querySelector('p');
  if (copyright) {
    copyright.className = 'footer-copyright';
    wrapper.append(copyright);
  }

  const list = legalSection.querySelector('ul');
  if (list) {
    list.className = 'footer-legal-links';
    wrapper.append(list);
  }

  legalSection.replaceWith(wrapper);
}

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  buildFooterColumns(footer);
  buildFooterSocial(footer);
  buildFooterLegal(footer);

  block.append(footer);
}
