const { getTsconfigPath } = require("@grikomsn/style-guide/eslint/helpers");

const tsconfigPath = getTsconfigPath();

module.exports = {
  extends: [
    require.resolve("@grikomsn/style-guide/eslint/node"),
    require.resolve("@grikomsn/style-guide/eslint/typescript"),
  ],
  parserOptions: {
    project: tsconfigPath,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: tsconfigPath,
      },
    },
  },
  root: true,
};