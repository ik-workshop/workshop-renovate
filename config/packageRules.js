/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.rules = [
  {
    "matchUpdateTypes": ["major", "minor", "patch", "pin", "digest"],
    "addLabels": ["{{depType}}", "{{datasource}}", "{{updateType}}"]
  },
  {
    "description": "Disables the creation of branches/PRs for any minor/patch updates etc. of python version",
    "matchFiles": [".*python-version"],
    "matchUpdateTypes": ["minor", "major"],
    "enabled": false
  },
  {
    "matchPackageNames": ["node"],
    "major": { "enabled": true },
    "separateMultipleMajor": true
  },
  {
    "automerge": false,
    "major": { "enabled": true },
    "separateMajorMinor": true,
    "separateMinorPatch": false,
    "matchDatasources": ["docker"],
    "separateMultipleMajor": true,
    "commitMessageSuffix": "({{packageFileDir}})",
    "groupName": "{{datasource}} {{depType}} {{packageFile}}"
  },
  {
    "automerge": false,
    "separateMajorMinor": true,
    "separateMinorPatch": false,
    "matchManagers": ["terraform", "terraform-version"],
    "matchPackagePatterns": [".*"],
    "groupName": "{{datasource}} {{depType}} {{packageFile}}",
    "commitMessageSuffix": "({{packageFileDir}})"
  },
  // {
  //   "commitMessageTopic": "Helm chart {{depName}}",
  //   "separateMajorMinor": true,
  //   "separateMinorPatch": false,
  //   "matchDatasources": ["helm"],
  //   "groupName": "{{datasource}} {{depType}} {{packageFile}}"
  // },
  {
    "separateMajorMinor": false,
    "separateMinorPatch": false,
    "groupName": "{{datasource}} {{depType}} {{packageFile}}",
    "commitMessageSuffix": "({{packageFileDir}})",
    "ignorePaths": [".*python-version"],
    "matchManagers": [
      "pip_requirements",
      "pyenv",
      "pip-compile",
      "pip_setup",
      "pipenv",
      "setup-cfg"
    ],
    "matchPackagePatterns": [".*"]
  },
  {
    "automerge": false,
    "matchManagers": ["terragrunt-version"],
    "commitMessageSuffix": "[skip ci]"
  },
  // https://github.com/renovatebot/renovate/issues/8231#issuecomment-1290550687
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
  // ami filter
  // https://github.com/renovatebot/renovate/pull/24086#issuecomment-1693760376
  {
    customType: "regex",
    fileMatch: ['.*\.tfvars$'],
    matchStrings: [
      '.*amiFilter=(?<packageName>.*?)\n(.*currentImageName=(?<currentDigest>.*?)\n)?(.*\n)?.*?(?<depName>[a-zA-Z0-9-_:]*)[ ]*?[:|=][ ]*?["|\']?(?<currentValue>ami-[a-z0-9]{17})["|\']?.*',
    ],
    datasourceTemplate: 'aws-machine-image',
    versioningTemplate: 'aws-machine-image',
  },
];
