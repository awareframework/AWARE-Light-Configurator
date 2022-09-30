module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "no-unused-vars": 1,
    "react/no-array-index-key": 1,
    "react/no-unescaped-entities": 1,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
