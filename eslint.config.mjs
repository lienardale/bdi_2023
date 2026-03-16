import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["scripts/**", "coverage/**"],
  },
];

export default eslintConfig;
