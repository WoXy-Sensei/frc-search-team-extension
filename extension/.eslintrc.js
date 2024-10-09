module.exports = {
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  env: {
    node: true,
    webextensions: true,
  },
};
