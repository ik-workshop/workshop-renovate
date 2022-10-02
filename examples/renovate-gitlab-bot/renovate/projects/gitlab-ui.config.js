const {
  createServerConfig,
  updateNothing,
  updateGitLabUIandSVG,
  ESLint,
  Stylelint,
  updateGitLabScopeDev,
  baseConfig,
  updateDOMPurify,
  semanticPrefixFixDepsChoreOthers,
} = require("../shared");
const { prJest, prBabel, prVueMajor2 } = require("../frontend");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/gitlab-ui",
    ...baseConfig,
    internalChecksFilter: "strict",
    separateMultipleMajor: true,
    stabilityDays: 3,
    rangeStrategy: "bump",
    semanticCommits: "enabled",
    packageRules: [
      ...semanticPrefixFixDepsChoreOthers,
      updateNothing,
      updateGitLabUIandSVG,
      ESLint,
      Stylelint,
      updateGitLabScopeDev,
      updateDOMPurify,
      {
        matchPackagePatterns: ["bootstrap-vue"],
        separateMultipleMajor: true,
        reviewers: ["pgascouvaillancourt"],
        reviewersSampleSize: 1,
        rangeStrategy: "bump",
        enabled: true,
        groupName: "Bootstrap Vue",
      },
      {
        matchPackagePatterns: ["@storybook/.*"],
        reviewers: ["pgascouvaillancourt"],
        reviewersSampleSize: 1,
        rangeStrategy: "bump",
        enabled: true,
        groupName: "Storybook",
      },
      {
        matchPackageNames: ["cypress"],
        rangeStrategy: "bump",
        enabled: true,
      },
      prJest,
      prBabel,
      { ...prVueMajor2, rangeStrategy: "auto" },
    ],
  },
]);
