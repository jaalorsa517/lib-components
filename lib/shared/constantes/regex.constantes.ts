export const Regex = {
  FLOAT: /\d*\.?\d+/g,
  IS_SECOND: /[^m]s+/,
};

export const ESCAPE = {
  newLine: {
    regex: /\\n/g,
    value: "",
  },
  doubleQuote: {
    regex: /\\"/g,
    value: '"',
  },
  tab: {
    regex: /\\t/g,
    value: "",
  },
};