```json
  "packageRules": [
    { "labels": ["major", "dependencies"], "matchUpdateTypes": ["major"] },
    {
      "labels": ["minor", "dependencies"],
      "groupName": "devDependencies(non-major)",
      "matchUpdateTypes": ["minor"]
    },
    {
      "labels": ["patch", "dependencies"],
      "groupName": "devDependencies(non-major)",
      "matchUpdateTypes": ["patch", "digest", "bump"]
    },
    { "labels": ["php"], "matchLanguages": ["php"] },
    { "labels": ["js"], "matchLanguages": ["js"] },
    { "labels": ["python"], "matchLanguages": ["python"] },
    { "matchPackagePatterns": ["*"] },
    { "groupName": "dependencies", "matchDepTypes": ["dependencies"] },
    { "groupName": "devDependencies", "matchDepTypes": ["devDependencies"] },
    {
      "groupName": "devDependencies(non-major)",
      "matchDepTypes": ["devDependencies(non-major)"]
    },
    {
      "automerge": false,
      "requiredStatusChecks": null,
      "matchDatasources": ["docker"],
      "matchUpdateTypes": ["patch"],
      "groupName": "devDependencies(non-major)"
    },
    {
      "commitMessageTopic": "Helm chart {{depName}}",
      "separateMinorPatch": true,
      "matchDatasources": ["helm"],
      "groupName": "helm"
    },
    {
      "labels": ["renovate/image-release", "dependency/major"],
      "enabled": true,
      "matchDatasources": ["docker"],
      "matchUpdateTypes": ["major"],
      "groupName": "docker"
    },
    {
      "allowedVersions": "^12.0.0",
      "groupName": "node",
      "matchPackageNames": ["node", "@types/node"]
    },
    {
      "allowedVersions": "^6.0.0",
      "groupName": "node",
      "matchPackageNames": ["npm"]
    },
    {
      "versioning": "semver",
      "matchDatasources": "go",
      "matchManagers": ["gomod"],
      "matchUpdateTypes": ["pin", "digest"]
    },
    {
      "matchDepTypes": ["devDependencies"],
      "matchUpdateTypes": ["patch", "minor"],
      "groupName": "devDependencies (non-major)"
    }
  ]
```
