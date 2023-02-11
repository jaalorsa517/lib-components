export const Regex = {
  FLOAT: /\d*\.?\d+/g,
  IS_SECOND: /[^m]s+/,
  COMMA_END: /([" | ' | \d | true | false])(,)/g,
  COMMA_BEFORE_CLOSE: /,[\s\t]*([\}\]])/g,
  OPEN_CONTENT: /([\{\[])/g,
  CLOSE_CONTENT: /([\}\]])/g,
  LOOK_KEY_OBJECT: /(['"])?([a-zA-Z0-9_-]+)(['"])?\s*:(.+[,]?)[^\}^\]\S]/gm,
  NEW_LINE_DUPLICATED: /[\n]{2,}/g,
};

export const ESCAPE = {
  newLine: {
    regex: /\\n/g,
    value: "\n",
  },
  backSlash: {
    regex: /\\\\/g,
    value: "\\",
  },
  doubleQuote: {
    regex: /\\"/g,
    value: '"',
  },
  tab: {
    regex: /\\t/g,
    value: "\t",
  },
  nothing: {
    regex: undefined,
    value: "",
  },
};
