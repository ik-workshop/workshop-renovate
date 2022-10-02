const { createServerConfig, updateOnlyGitLabScope } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/customers-gitlab-com",
    ...updateOnlyGitLabScope,
    reviewers: [
      "vitallium",
      "aalakkad",
    ],
    reviewersSampleSize: 1,
    semanticCommits: "disabled",
  },
]);
