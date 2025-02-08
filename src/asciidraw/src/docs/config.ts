export interface DocsTreeConfig {
  [key: string]: DocsTreeConfig
}


export const docsTreeConfig: DocsTreeConfig = {
  "what-is-asciidraw": {},
  "getting-started": {},
  "elements": {
    "box": {},
    "group": {},
    "label": {},
    "progress-bar": {},
  },
  "shortcuts": {},
  "export": {
    "text": {},
    "image": {},
    "svg": {},
  },
  'faq': {},
};
