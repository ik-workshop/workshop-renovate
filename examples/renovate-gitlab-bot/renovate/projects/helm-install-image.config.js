const { createServerConfig, baseConfig } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/cluster-integration/helm-install-image",
    ...baseConfig,
    semanticCommits: "disabled",
    reviewers: ["Alexand", "hfyngvason", "tigerwnz"],
    labels: [
      "group::configure",
      "devops::configure",
      "section::ops",
      "type::maintenance",
      "maintenance::dependency",
    ],
    enabledManagers: ["regex"],
    separateMinorPatch: true,
    separateMultipleMajor: true, // so that we get an MR for each minor of kubectl
    commitMessageExtra: "to v{{{newVersion}}}", // renovate's default template is wonky with kubectl major version override
    regexManagers: [
      {
        enabled: true,
        fileMatch: [".gitlab-ci.yml", "README.md"],
        matchStrings: [
          "KUBECTL_VERSION: '(?<currentValue>.*)'\n",
          "kube-(?<currentValue>.*)-alpine"
        ],
        depNameTemplate: "kubectl",
        packageNameTemplate: "kubernetes/kubernetes",
        datasourceTemplate: "github-tags",
        extractVersionTemplate: "^v(?<version>.+)$",
        versioningTemplate: "regex:^1\\.(?<major>\\d+)\\.(?<minor>\\d+)$" // kubernetes does not follow semver
      },
      {
        enabled: true,
        fileMatch: [".gitlab-ci.yml", "README.md"],
        matchStrings: [
          "HELM3_VERSION: '(?<currentValue>.*)'\n",
          "(?<currentValue>\\d+\\.\\d+\\.\\d+)-kube"
        ],
        depNameTemplate: "helm",
        packageNameTemplate: "helm/helm",
        datasourceTemplate: "github-tags",
        extractVersionTemplate: "^v(?<version>.+?)$"
      },
      {
        enabled: true,
        fileMatch: [".gitlab-ci.yml", "README.md"],
        matchStrings: [
          "ALPINE_VERSION: '(?<currentValue>.*)'\n",
          "alpine-(?<currentValue>.*)\n"
        ],
        depNameTemplate: "alpine",
        datasourceTemplate: "docker",
      }
    ],
    postUpgradeTasks: {
      commands: ["./update-checksums.sh"],
      fileFilters: ["helm3.sha256sum.*", "kubectl.sha512sum.*"],
      executionMode: "branch"
    }
  },
], {
  allowedPostUpgradeCommands: ['^\./update-checksums\.sh$'],
});
