import { Component, h, Element, State, Host } from '@stencil/core';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserPostCss from 'prettier/parser-postcss';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { trimFirstLine } from './trimFirstLine';
hljs.registerLanguage('xml', xml);

@Component({
  tag: 'component-preview',
  styleUrl: 'component-preview.scss',
  shadow: false,
})
export class ComponentPreview {
  @Element() el: HTMLElement;

  @State() isCodeVisible = false;

  private innerHTML: string;

  componentWillLoad() {
    this.innerHTML = hljs.highlight(
      'xml',
      prettier.format(trimFirstLine(this.el.innerHTML), {
        parser: 'html',
        plugins: [parserHtml, parserPostCss],
      })
    ).value;
  }

  render() {
    return (
      <Host>
        <div class="component-preview__preview">
          <slot />
        </div>
        <div class="component-preview__code-previewer">
          <a
            role="button"
            tabindex="0"
            class={{
              'component-preview__toggle': true,
              'component-preview__toggle--active': this.isCodeVisible,
            }}
            onClick={() => (this.isCodeVisible = !this.isCodeVisible)}
          >
            {this.isCodeVisible ? 'Hide' : 'Show'} code
          </a>
          <div
            class={{
              'component-preview__code-container': true,
              'component-preview__code-container--visible': this.isCodeVisible,
            }}
          >
            <pre
              class="component-preview__code hljs"
              innerHTML={this.innerHTML}
            ></pre>
          </div>
        </div>
      </Host>
    );
  }
}
