# <x-ray>

Probably, the easiest way to demo HTML/Web components.

Demo: [https://sneas.github.io/x-ray](https://sneas.github.io/x-ray)

## Installation

### HTML

```html
<script
  type="module"
  src="https://unpkg.com/@sneas/x-ray@latest/dist/component/component.esm.js"
></script>
```

### NodeJS

```sh
npm install @sneas/x-ray --save
```

Add import within the root component:

```js
import '@sneas/x-ray';
```

## Usage

```html
<x-ray>
  <!-- The demo code goes here -->
  <!-- For example, Bootstrap 4 Alert: -->
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> You should check in on some of those fields
    below.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</x-ray>
```

Which provides the result below:

![Preview of Bootstrap 4 Alert Component](docs/bootstrap-alert.png)
