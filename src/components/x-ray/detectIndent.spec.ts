import { detectIndent } from './detectIndent';

describe('detectIndent', () => {
  it('considers empty lines at the beginning of strings', () => {
    expect(
      detectIndent(`

            <code>
              <script type="module" src="https://unpkg.com/img-comparison-slider@latest/dist/component/component.esm.js"></script>
              <script nomodule="" src="https://unpkg.com/img-comparison-slider@latest/dist/component/component.js"></script>
              <link rel="stylesheet" href="https://unpkg.com/img-comparison-slider@latest/dist/collection/styles/initial.css">
              <img-comparison-slider>
                <img slot="before" src="./demo/before.jpg" style="width: 100%;">
                <img slot="after" src="./demo/after.jpg" style="width: 100%;">
              </img-comparison-slider>
            </code>
          `)
    ).toEqual(12);
  });

  it('respects strings without characters', () => {
    expect(
      detectIndent(`
      `)
    ).toEqual(0);
  });
});
