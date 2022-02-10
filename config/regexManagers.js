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
];
