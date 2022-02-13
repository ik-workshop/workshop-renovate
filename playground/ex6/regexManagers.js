/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.managers = [
  {
    "fileMatch": [".*"],
    "matchStrings": [
      "chart:\n *repository: (?<repository>.*?)\n *name: (?<depName>.*?)\n *version: (?<currentValue>.*)\n"
    ],
    "datasourceTemplate": "helm"
  },
];
