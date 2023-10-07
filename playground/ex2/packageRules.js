/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

// https://github.com/renovatebot/renovate/issues/8231#issuecomment-1310786410
// allowPostUpgradeCommandTemplating: true,
// allowedPostUpgradeCommands: ["^.*",],

module.exports.rules = [
  {
    "postUpgradeTasks": {
      "commands": [
        "sed -i \"s/^version:.*/version: $(grep '^version:' Chart.yaml | awk '{print $2}' | awk -F '[.\"]' '{$NF = $NF + 1;} 1' | sed 's/ /./g')/\" Chart.yaml",
      ],
      "fileFilters": ["Chart.yaml"],
      "executionMode": "branch"
    },
  },
  {
    "matchManagers": [
      "helm-requirements",
      "helm-values",
    ],
    "postUpgradeTasks": {
      "commands": [
        `version=$(grep '^version:' {{{parentDir}}}/Chart.yaml | awk '{print $2}')
        major=$(echo $version | cut -d. -f1)
        minor=$(echo $version | cut -d. -f2)
        patch=$(echo $version | cut -d. -f3)
        minor=$(expr $minor + 1)
        echo "Replacing $version with $major.$minor.$patch"
        sed -i "s/^version:.*/version: $\{major\}.$\{minor\}.$\{patch\}/g" {{{parentDir}}}/Chart.yaml
        cat {{{parentDir}}}/Chart.yaml
        `
      ],
      "fileFilters": [
        "**/Chart.yaml",
      ],
      "executionMode": "branch",
    },
  },
];
