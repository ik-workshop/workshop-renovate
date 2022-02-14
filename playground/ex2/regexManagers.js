/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.managers = [
  {
    "fileMatch": [
      "^Dockerfile$",
      '.*\/ex2\/Dockerfile$'
    ],
    "matchStrings": [
      "datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\\s(ARG|ENV) .*?_VERSION=(?<currentValue>.*)\\s"
    ],
    "versioningTemplate": "{{#if versioning}}{{{versioning}}}{{else}}semver{{/if}}"
  },
  {
    "fileMatch": [
      "^Dockerfile$",
      ".*\/ex2\/Dockerfile$"
    ],
    "matchStrings": [
      "ARG IMAGE=(?<depName>.*?):(?<currentValue>.*?)@(?<currentDigest>sha256:[a-f0-9]+)s"
    ],
    "datasourceTemplate": "docker"
  }
];
