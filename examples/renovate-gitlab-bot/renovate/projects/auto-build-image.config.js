const { createServerConfig, baseConfig } = require("../shared");

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/cluster-integration/auto-build-image",
    ...baseConfig,
    semanticCommits: "enabled",
    semanticCommitType: "feat",
    reviewers: ["Alexand", "hfyngvason", "tigerwnz"],
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
          "PACK_VERSION: (?<currentValue>.*)\n"
        ],
        depNameTemplate: "pack",
        packageNameTemplate: "buildpacks/pack",
        datasourceTemplate: "github-tags",
      },
      {
        enabled: true,
        fileMatch: [".gitlab-ci.yml"],
        matchStrings: [
          "DOCKER_VERSION: (?<currentValue>.*)\n"
        ],
        depNameTemplate: "docker",
        datasourceTemplate: "docker",
      },
      {
        enabled: true,
        fileMatch: [".gitlab-ci.yml"],
        matchStrings: [
          "BUILDX_VERSION: (?<currentValue>.*)\n"
        ],
        depNameTemplate: "buildx",
        packageNameTemplate: "docker/buildx",
        datasourceTemplate: "github-tags",
      }
    ],
  }
]);
