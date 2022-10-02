const { createServerConfig, baseConfig, epBaseConfig } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/gitlab-development-kit",
    ...baseConfig,
    labels: [
      ...epBaseConfig.labels,
      "Category:GDK",
    ],
    reviewers: [
      "ashmckenzie",
      "tigerwnz",
      "toon",
    ],
    reviewersSampleSize: 1,
    enabledManagers: ["npm", "bundler"],
    packageRules: [
      {
        schedule: ["before 05:00 on Monday"],
        matchPackagePatterns: [".+"],
        rangeStrategy: "bump",
        matchManagers: ["bundler"],
        groupName: "Ruby dependencies",
      },
    ],
  },
]);
