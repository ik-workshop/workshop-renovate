const { createServerConfig, baseConfig, defaultLabels } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/gitlab-docs",
    ...baseConfig,
    labels: [
      ...defaultLabels,
      "Technical Writing",
      "Category:Docs Site",
    ],
    reviewers: [
      "axil",
      "eread",
      "marcel.amirault",
      "sarahgerman",
    ],
    reviewersSampleSize: 3,
    enabledManagers: ["npm", "bundler"],
    prConcurrentLimit: 4,
    semanticCommits: "disabled",
    packageRules: [
      {
        matchPackagePatterns: ["bootstrap", "vue", "gitlab_kramdown", "@rollup/plugin-node-resolve"],
        enabled: false,
      },
      {
        schedule: ["before 05:00 on Monday"],
        matchPackagePatterns: [".+"],
        rangeStrategy: "bump",
        matchManagers: ["bundler"],
        groupName: "Ruby dependencies",
      },
      {
        schedule: ["before 05:00 on Monday"],
        matchPackagePatterns: [".+"],
        rangeStrategy: "bump",
        matchManagers: ["npm"],
        groupName: "NodeJS dependencies",
      },
    ],
  },
]);
