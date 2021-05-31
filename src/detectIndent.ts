export const detectIndent = (s: string): number => {
  let counter = 0;

  const nonSpace = /\S/;

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === '\n') {
      counter = 0;
      continue;
    }

    if (nonSpace.test(s.charAt(i))) {
      return counter;
    }

    counter++;
  }

  return 0;
};
