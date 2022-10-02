const { createServerConfig, updateOnlyGitLabScope } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/gitlab-svgs",
    ...updateOnlyGitLabScope,
    semanticCommits: "disabled",
  },
]);
