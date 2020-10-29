import { Component, h, Element, State, Host } from '@stencil/core';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserPostCss from 'prettier/parser-postcss';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { trimFirstLine } from './trimFirstLine';
hljs.registerLanguage('xml', xml);

@Component({
  tag: 'x-ray',
  styleUrl: 'x-ray.scss',
  shadow: false,
})
export class XRay {
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
        <div class="x-ray__preview">
          <slot />
        </div>
        <div class="x-ray__code-previewer">
          <a
            role="button"
            tabindex="0"
            class={{
              'x-ray__toggle': true,
              'x-ray__toggle--active': this.isCodeVisible,
            }}
            onClick={() => (this.isCodeVisible = !this.isCodeVisible)}
          >
            {this.isCodeVisible ? 'Hide' : 'Show'} code
          </a>
          <div
            class={{
              'x-ray__code-container': true,
              'x-ray__code-container--visible': this.isCodeVisible,
            }}
          >
            <pre class="x-ray__code hljs" innerHTML={this.innerHTML}></pre>
          </div>
        </div>
      </Host>
    );
  }
}
