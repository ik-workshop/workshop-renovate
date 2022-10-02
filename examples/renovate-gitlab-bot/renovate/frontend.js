const prJest = {
  matchPackageNames: ["jest", "jest-environment-jsdom", "jest-circus"],
  enabled: true,
  groupName: "Jest",
};

const prBabel = {
  matchPackagePatterns: ["@babel.+"],
  enabled: true,
  groupName: "Babel",
};

/**
 * Update vue, template compiler and server renderer to latest Major 2 version
 */
const prVueMajor2 = {
  matchPackageNames: ["vue", "vue-template-compiler", "vue-server-renderer"],
  rangeStrategy: "bump",
  allowedVersions: "<3",
  enabled: true,
  groupName: "Vue",
};

module.exports = {
  prBabel,
  prJest,
  prVueMajor2,
};
