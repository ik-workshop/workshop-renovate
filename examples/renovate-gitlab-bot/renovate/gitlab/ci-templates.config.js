const { createServerConfig, updateNothing, baseConfig } = require("../shared");

const baseLabels = [
  "type::maintenance",
  "maintenance::dependency",
  "ci::templates"
];

const groupConfigureLabels = [
  ...baseLabels,
  "group::configure",
  "devops::configure",
  "section::ops",
];

const groupReleaseLabels = [
  ...baseLabels,
  "group::release",
  "devops::release",
  "section::ops",
];

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/gitlab",
    dependencyDashboardTitle: "Dependency Dashboard (CI templates)",
    ...baseConfig,
    branchPrefix: "renovate-ci-templates/",
    enabledManagers: ["regex"],
    semanticCommits: "disabled",
    reviewers: ["hfyngvason", "shinya.maeda", "marcel.amirault", "laurax"], // CI template maintainers
    labels: baseLabels,
    includePaths: ["lib/gitlab/ci/templates/**/*"],
    commitBody: "Changelog: changed",
    packageRules: [
      {
        groupName: "auto-build-image labels and reviewers",
        matchPackageNames: ["auto-build-image"],
        reviewers: ["Alexand", "hfyngvason", "tigerwnz"], // domain experts
        labels: groupConfigureLabels, // group::configure owns auto-build-image
      },
      {
        groupName: "auto-deploy-image labels and reviewers",
        matchPackageNames: ["auto-deploy-image"],
        reviewers: ["Alexand", "tigerwnz", "shinya.maeda", "hfyngvason"], // domain experts
        labels: groupReleaseLabels, // group::release owns auto-deploy-image
      },
      {
        groupName: "major version updates are breaking changes",
        matchUpdateTypes: ["major"],
        addLabels: [
          "breaking change",
        ],
      },

    ],
    regexManagers: [
      // auto-build-image
      {
        enabled: true,
        fileMatch: [
          "lib/gitlab/ci/templates/Jobs/Build.gitlab-ci.yml",
          "lib/gitlab/ci/templates/Jobs/Build.latest.gitlab-ci.yml",
        ],
        matchStrings: [
          "AUTO_BUILD_IMAGE_VERSION: '(?<currentValue>.*)'\n",
        ],
        datasourceTemplate: "gitlab-releases", // although it is a docker image, use gitlab-releases so we get richer information in the MR
        registryUrlTemplate: "https://gitlab.com",
        packageNameTemplate: "gitlab-org/cluster-integration/auto-build-image",
        depNameTemplate: "auto-build-image",
      },
      // auto-deploy-image
      {
        enabled: true,
        fileMatch: [
          "lib/gitlab/ci/templates/Jobs/Deploy.gitlab-ci.yml",
          "lib/gitlab/ci/templates/Jobs/Deploy.latest.gitlab-ci.yml",
          "lib/gitlab/ci/templates/Jobs/DAST-Default-Branch-Deploy.gitlab-ci.yml",
        ],
        matchStrings: [
          "AUTO_DEPLOY_IMAGE_VERSION: '(?<currentValue>.*)'\n", // matches DAST_AUTO_DEPLOY_IMAGE_VERSION AND AUTO_DEPLOY_IMAGE_VERSION
        ],
        datasourceTemplate: "gitlab-releases", // although it is a docker image, use gitlab-releases so we get richer information in the MR
        registryUrlTemplate: "https://gitlab.com",
        packageNameTemplate: "gitlab-org/cluster-integration/auto-deploy-image",
        depNameTemplate: "auto-deploy-image",
      },
    ]
  },
]);
