import { trimIndent } from './trimIndent';

describe('trimIndent', () => {
  it('trims indents on new lines', () => {
    expect(
      trimIndent(
        `s

      ff
    s  `,
        4
      )
    ).toEqual(`s

  ff
s  `);
  });
});
