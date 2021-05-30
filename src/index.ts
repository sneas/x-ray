import './components/say-something.ts';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <h1>Web Components with Webpack Starter Kit</h1>

    Text: <input type="text" />

    <say-something></say-something>
    <say-something color="red"></say-something>
  </div>
`;

class App extends HTMLElement {
  private $allSaySomething;
  private $input;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = shadowRoot.querySelector('input');
    this.$input.addEventListener('input', this._handleChange.bind(this));

    this.$allSaySomething = shadowRoot.querySelectorAll('say-something');
  }

  _handleChange() {
    this.$allSaySomething.forEach((element) => {
      element.setAttribute('text', this.$input.value);
    });
  }
}

window.customElements.define('my-app', App);
