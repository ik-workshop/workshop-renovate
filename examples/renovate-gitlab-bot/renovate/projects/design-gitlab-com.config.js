const {
  createServerConfig,
  baseConfig,
  semanticPrefixFixDepsChoreOthers,
  updateGitLabUIandSVG,
  ESLint,
  Stylelint,
  updateGitLabScopeDev,
} = require("../shared");
const { prVueMajor2, prBabel, prJest } = require("../frontend");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/design.gitlab.com",
    ...baseConfig,
    reviewers: [
      "leipert",
      "markrian",
      "mikegreiling",
      "ohoral",
      "pgascouvaillancourt",
    ],
    internalChecksFilter: "strict",
    separateMultipleMajor: true,
    stabilityDays: 3,
    rangeStrategy: "bump",
    semanticCommits: "enabled",
    packageRules: [
      ...semanticPrefixFixDepsChoreOthers,
      {
        ...updateGitLabUIandSVG,
        schedule: ["before 05:00 on Monday"],
      },
      ESLint,
      Stylelint,
      updateGitLabScopeDev,
      prVueMajor2,
      prBabel,
      prJest,
    ],
  },
]);
