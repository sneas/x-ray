import { trimFirstLine } from './trimFirstLine';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { trimIndent } from './trimIndent';
import { detectIndent } from './detectIndent';
import styles from './index.scss';

hljs.registerLanguage('xml', xml);

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${styles}
  </style>

  <div class="x-ray__preview">
    <slot />
  </div>
  <div class="x-ray__code-previewer">
    <a
      role="button"
      tabindex="0"
      class="x-ray__toggle"
    >Show code</a>
    <div class="x-ray__code-container">
      <pre class="x-ray__code hljs"></pre>
    </div>
  </div>
`;

class XRay extends HTMLElement {
  private code: string = '';

  constructor() {
    super();
    this.code = trimFirstLine(this.querySelector('code:first-child').innerHTML);
    this.appendChild(template.content.cloneNode(true));

    const codeElement = this.querySelector('.x-ray__code');
    codeElement.innerHTML = hljs.highlight(
      trimIndent(this.code, detectIndent(this.code)).trim(),
      {
        language: 'xml',
      }
    ).value;

    const codeToggleButtonElement = this.querySelector('.x-ray__toggle');
    const codeContainerElement = this.querySelector('.x-ray__code-container');

    const toggle = () => {
      const codeIsVisible = codeToggleButtonElement.classList.toggle(
        'x-ray__toggle--active'
      );
      codeContainerElement.classList.toggle(
        'x-ray__code-container--visible',
        codeIsVisible
      );
    };

    codeToggleButtonElement.addEventListener('click', toggle);

    const TOGGLE_KEYS = ['Space', 'Enter'];
    codeToggleButtonElement.addEventListener('keypress', (e: KeyboardEvent) => {
      if (TOGGLE_KEYS.includes(e.code)) {
        e.preventDefault();
        toggle();
      }
    });
  }
}

window.customElements.define('x-ray', XRay);
