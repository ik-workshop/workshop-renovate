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
  }
];
