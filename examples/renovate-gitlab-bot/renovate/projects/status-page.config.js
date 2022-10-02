const {
  createServerConfig,
  baseConfig,
  updateOnlyGitLabScope,
} = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/status-page",
    ...baseConfig,
    ...updateOnlyGitLabScope,
    reviewers: [
      "ohoral",
      "oregand",
      "tristan.read",
    ],
    reviewersSampleSize: 1,
    semanticCommits: "disabled",
  },
]);
