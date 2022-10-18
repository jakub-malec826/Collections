module.exports = {
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": "error",
    },
};
