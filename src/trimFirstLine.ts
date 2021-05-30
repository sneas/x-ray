export const trimFirstLine = (html: string): string => {
  return html.replace('<!---->', '');
};
