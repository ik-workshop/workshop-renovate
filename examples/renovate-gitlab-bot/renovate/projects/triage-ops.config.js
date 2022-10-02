const { createServerConfig, baseConfig, epBaseConfig } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/triage-ops",
    ...baseConfig,
    ...epBaseConfig,
    branchPrefix: "renovate-gems/",
    enabledManagers: ["bundler"],
    semanticCommits: "disabled",
    packageRules: [
      {
        // We don't want to update graphql as it's pinned due to a specific reason:
        // https://gitlab.com/gitlab-org/quality/triage-ops/-/blob/ecf3cf00bbf02/Gemfile#L15-17
        matchPackagePatterns: ["graphql"],
        enabled: false,
      },
      {
        enabled: true,
        matchPackagePatterns: [".+"],
        excludePackagePatterns: ["graphql"],
        rangeStrategy: "bump",
        matchManagers: ["bundler"],
        groupName: "Ruby production dependencies",
      },
      {
        enabled: true,
        matchDepTypes: ["test", "development"],
        rangeStrategy: "bump",
        matchManagers: ["bundler"],
        groupName: "Ruby development dependencies",
      },
    ],
  },
]);
