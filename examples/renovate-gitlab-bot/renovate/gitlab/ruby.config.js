const {
  createServerConfig,
  updateNothing,
  baseConfig,
  epBaseConfig,
} = require("../shared");

module.exports = createServerConfig(
  [
    {
      repository: "gitlab-renovate-forks/gitlab",
      dependencyDashboardTitle: "Dependency Dashboard (ruby)",
      ...baseConfig,
      ...epBaseConfig,
      branchPrefix: "renovate-gems/",
      enabledManagers: ["bundler"],
      semanticCommits: "disabled",
      rangeStrategy: "bump",
      postUpgradeTasks: {
        // Regenerate files that may change due to the dependency updates.
        commands: ["/workdir/renovate/gitlab/bundle-checksum.sh"],
        fileFilters: ["Gemfile.checksum"],
      },
      packageRules: [
        updateNothing,
        {
          matchPackageNames: [
            "better_errors",
            "bootsnap",
            "brakeman",
            "danger",
            "lefthook",
            "letter_opener_web",
            "parser",
            "thin",
          ],
          enabled: true,
          groupName: "Ruby development dependencies",
        },
        {
          matchPackageNames: ["gitlab-styles", "gitlab-dangerfiles"],
          enabled: true,
          groupName: "GitLab Tooling Ruby dependencies",
        },
        {
          matchPackageNames: [
            "nokogiri",
            "premailer",
            "re2",
            "rouge",
            "loofah",
            "rails-html-sanitizer",
          ],
          enabled: true,
          groupName: "Ruby Markdown and HTML parsing dependencies",
        },
        {
          matchPackageNames: ["pg", "pg_query"],
          enabled: true,
          groupName: "Ruby database dependencies",
        },
        {
          matchPackageNames: [
            "rack",
            "rack-accept",
            "rack-attack",
            "rack-cors",
            "rack-oauth2",
            "rack-proxy",
            "rack-test",
            "rack-timeout",
          ],
          enabled: true,
          groupName: "Ruby Rack-related dependencies",
        },
        {
          matchPackageNames: ["aws-sdk-core", "aws-sdk-s3"],
          enabled: true,
          groupName: "Ruby AWS-related dependencies",
        },
        {
          matchPackageNames: ["lookbook", "view_component"],
          enabled: true,
          reviewers: ["thutterer"],
        },
      ],
    },
  ],
  {
    allowedPostUpgradeCommands: [
      "^/workdir/renovate/gitlab/bundle-checksum.sh$", // Allow to regenerate Gemfile.checksum.
    ],
  }
);
