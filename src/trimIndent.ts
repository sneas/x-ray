export const trimIndent = (s: string, indent: number): string => {
  const regex = new RegExp(`^\\s{${indent}}`);
  return s
    .split('\n')
    .map((l) => l.replace(regex, ''))
    .join('\n');
};
