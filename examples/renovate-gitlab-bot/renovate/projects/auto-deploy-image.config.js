const { createServerConfig, baseConfig } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/cluster-integration/auto-deploy-image",
    ...baseConfig,
    semanticCommits: "enabled",
    semanticCommitType: "feat",
    reviewers: ["Alexand", "hfyngvason", "tigerwnz", "shinya.maeda"],
    labels: [
      "group::configure",
      "devops::configure",
      "section::ops",
      "type::maintenance",
      "maintenance::dependency",
    ],
    enabledManagers: ["regex"],
    regexManagers: [
      {
        enabled: true,
        fileMatch: [".gitlab-ci.yml"],
        matchStrings: [
          "HELM_INSTALL_IMAGE_VERSION: (?<currentValue>.*)\n",
        ],
        depNameTemplate: "helm-install-image",
        packageNameTemplate: "registry.gitlab.com/gitlab-org/cluster-integration/helm-install-image",
        datasourceTemplate: "docker",
        versioningTemplate: "regex:^v(?<major>\\d+)\\.(?<minor>\\d+)",
      },
    ],
  }
]);
