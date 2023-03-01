export const isAlpha = (str) => (/^[A-Za-z]+$/.test(str))

export const isNumber = (str) => (/^\d+$/.test(str));

export const hasNumbers = (str) => (/\d/g.test(str));

export const isWhitespace = (str) => (/\s/g.test(str));

export const isEmail = (str) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str));

export const isSpecialChar = (str) => (/[^a-zA-Z0-9 ]/.test(str));

export const hasSpecialChars = (str) => (/[a-zA-Z0-9 ]/g.test(str));