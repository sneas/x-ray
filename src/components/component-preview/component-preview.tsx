import { Component, h, Element, State } from '@stencil/core';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserPostCss from 'prettier/parser-postcss';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('xml', xml);

@Component({
  tag: 'component-preview',
  styleUrl: 'component-preview.scss',
  shadow: true,
})
export class ComponentPreview {
  @Element() el: HTMLElement;

  @State() isCodeVisible = true;

  private innerHTML: string;

  componentWillLoad() {
    this.innerHTML = hljs.highlight(
      'xml',
      prettier.format(this.el.innerHTML, {
        parser: 'html',
        plugins: [parserHtml, parserPostCss],
      })
    ).value;
  }

  render() {
    return (
      <div>
        <div class="preview">
          <slot />
        </div>
        <button onClick={() => (this.isCodeVisible = !this.isCodeVisible)}>
          Toggle Code
        </button>
        {this.isCodeVisible && (
          <pre class="hljs" innerHTML={this.innerHTML}></pre>
        )}
      </div>
    );
  }
}
