```json
"regexManagers": [
    {
      "fileMatch": ["\\.yaml$"],
      "matchStrings": [
        "registryUrl=(?<registryUrl>.*?)\n *chart: (?<depName>.*?)\n *version: (?<currentValue>.*)\n"
      ],
      "datasourceTemplate": "helm"
    },
    {
      "fileMatch": ["sample.yml"],
      "matchStrings": ["version: (?<depName>.*?)@(?<currentValue>.*?)\n"],
      "datasourceTemplate": "github-tags"
    },
    {
      "fileMatch": ["versions.yml"],
      "matchStrings": [
        "datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\n.*?_version: (?<currentValue>.*)\n"
      ],
      "versioningTemplate": "{{#if versioning}}{{versioning}}{{else}}semver{{/if}}"
    },
    {
      "fileMatch": [
        ".github/workflows/blank.yml",
        ".github/workflows/takeover-output.yml"
      ],
      "matchStrings": ["uses: (?<depName>.*?)@(?<currentValue>.*?)\n"],
      "datasourceTemplate": "github-releases"
    },
    {
      fileMatch: [
        '^Dockerfile$',
        "Dockerfile$",
      ],
      matchStrings: [
        '#\\s*renovate:\\s*datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\\s(ARG|ENV) .*?_VERSION(=|\\s)(?<currentValue>.*)\\s'
      ],
      versioningTemplate: '{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}'
    },
    {
      "fileMatch": [
        "^Dockerfile$",
        "Dockerfile$",
        "(^|/|\\.)Dockerfile$",
        "(^|/)Dockerfile\\.[^/]*$"
      ],
      "matchStrings": [
        "#\\s*renovate:\\s*depName=(?<depName>.*?)?\\s.*?:\\s(?<currentValue>.*)\\s"
      ],
      "versioningTemplate": "semver",
      "datasourceTemplate": "github-releases",
      "lookupNameTemplate": "{{{depName}}}"
    },
    {
      "fileMatch": [
        "Dockerfile$",
        "^Dockerfile$",
        "(^|/|\\.)Dockerfile$",
        "(^|/)Dockerfile\\.[^/]*$"
      ],
      "matchStrings": [
        "datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\\sENV .*?_VERSION=(?<currentValue>.*)\\s"
      ],
      "versioningTemplate": "{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}",
      "datasourceTemplate": "github-releases"
    },
  ]
```
