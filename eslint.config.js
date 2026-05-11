import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["node_modules/**", "dist/**", "temp/**", "src/swagger/**"] },
  ...tsPlugin.configs["flat/recommended"],
  prettier,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module",
      },
    },
    rules: {
      "no-console": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/no-use-before-define": [
        "error",
        { functions: false, typedefs: false },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-ignore": false }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { vars: "all", args: "none" },
      ],
    },
  },
];
