/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.managers = [
  {
    // example: https://gitlab.com/HnBI/platform-as-a-service/infrastructure/-/blob/master/magnolia/environments/dev/eu-west-1/terraform.tfvars#L35
    // docs: https://docs.renovatebot.com/configuration-options/#registryurls
    // should match: 'docker_image =  "registry.gitlab.com/hnbi/platform-as-a-service/docker-images/magnolia:0.22.0"'
    "fileMatch": [".*terraform.tfvars$"],
    "matchStrings": [
      "docker_image\\s*=\\s*\"(?<depName>.*?):(?<currentValue>.*)\""
    ],
    "datasourceTemplate": "docker"
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
  // https://github.com/renovatebot/renovate/pull/19371/files
  {
    "datasourceTemplate": "docker",
    "fileMatch": ["(^|/)Chart\\.yaml$"],
    "matchStrings": [
      "#\\s?renovate: image=(?<depName>.*?)\\s?appVersion:\\s?\\\"?(?<currentValue>[\\w+\\.\\-]*)\""
    ]
  }б
  {
    "fileMatch": ["^Dockerfile$"],
    "matchStrings": [
      "datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\\sENV .*?_VERSION=(?<currentValue>.*)\\s"
    ],
    "versioningTemplate": "{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}"
  },
  {
    "fileMatch": ["^Dockerfile$"],
    "matchStrings": [
      "ARG IMAGE=(?<depName>.*?):(?<currentValue>.*?)@(?<currentDigest>sha256:[a-f0-9]+)\\s"
    ],
    "datasourceTemplate": "docker"
  },
  // https://github.com/jkroepke/renovate/blob/41c75d5342ed9858bdca9c2d333bc83ce6357baa/lib/modules/manager/regex/readme.md#using-regexmanager-to-update-the-dependency-name-in-addition-to-version
  {
    "fileMatch": [".*y[a]?ml$"],
    "matchStringsStrategy": "combination",
    "matchStrings": [
      "['\"]?(?<depName>/pipeline-fragments\\/fragment-version-check)['\"]?\\s*ref:\\s['\"]?(?<currentValue>[\\d-]*)['\"]?",
      "['\"]?(?<depName>pipeline-solutions\\/gitlab\\/fragments\\/fragment-version-check)['\"]?\\s*ref:\\s['\"]?(?<currentValue>[\\d-]*)['\"]?"
    ],
    "depNameTemplate": "pipeline-solutions/gitlab/fragments/fragment-version-check",
    "autoReplaceStringTemplate": "'{{{depName}}}'\n    ref: {{{newValue}}}",
    "datasourceTemplate": "gitlab-tags",
    "versioningTemplate": "gitlab-tags"
  },
  // https://github.com/renovatebot/renovate/discussions/23426#discussioncomment-6489732
  {
    "description": "Update bitnami openldap image references in Chart.yaml",
    "fileMatch": ["^charts\\/openldap-bitnami\\/Chart\\.yaml$"],
    "matchStrings": [
      "appVersion:\\s+(?<currentValue>.*?)"
    ],
    "depNameTemplate": "bitnami/openldap",
    "datasourceTemplate": "docker"
  },
  {
    "description": "Update bitnami openldap image references in README",
    "fileMatch": ["^charts\\/openldap-bitnami\\/README\\.md$"],
    "matchStrings": [
      "\\[AppVersion:\\s+(?<currentValue>.*?)\\]"
    ],
    "depNameTemplate": "bitnami/openldap",
    "datasourceTemplate": "docker"
  }
];
