/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.managers = [
  {
    "fileMatch": ['sandbox\/ex6\/.*\.yaml'],
    "matchStrings": [
      "chart:\n *repository: (?<registryUrl>.*?)\n *name: (?<depName>.*?)\n *version: (?<currentValue>.*)\n"
    ],
    "datasourceTemplate": "helm"
  },
  {
    "fileMatch": ['sandbox\/ex6\/dev\.env'],
    "matchStrings": [
      "^#\\s*renovate:\\s*repository=(?<registryUrl>.*?)\\s*depName=(?<depName>.*?)\n.*?_HELM_CHART_VERSION=\"(?<currentValue>.*)\""
    ],
    "datasourceTemplate": "helm"
  },
  // does not work
  {
    "fileMatch": ['sandbox\/ex6\/dev\.env'],
    "matchStrings": [
      "^(?i)(?<depName>.*?)_HELM_CHART_VERSION=\"(?<currentValue>.*)\""
    ],
    "datasourceTemplate": "helm"
  },
];

// registryUrl helps to lookup the right helm chart
// TO FIX
// "packageFile": "sandbox/ex6/helm-release.yaml",
//   "deps": [
//     {
//       "depName": "ingress-nginx",
//       "currentValue": "1.0.0",
//       "datasource": "helm",
//       "replaceString": "chart:\n    repository: https://kubernetes.github.io/ingress-nginx/\n    name: ingress-nginx\n    version: 1.0.0\n",
//       "depIndex": 0,
//       "updates": [],
//       "warnings": [
//         {
//           "topic": "ingress-nginx",
//           "message": "Failed to look up dependency ingress-nginx"
//         }
//       ],
//       "versioning": "helm"
//     },

// {
//   "fileMatch": ['sandbox\/ex6\/.*\.yaml'],
//     "matchStrings": [
//       "chart:\n\\s*repository: (?<repository>.*?)\n\\s*name: (?<depName>.*?)\n\\s*version: (?<currentValue>.*)$"
//     ],
//       "datasourceTemplate": "helm"
// },
// {
//   "fileMatch": ['sandbox\/ex6\/.*\.yaml'],
//     "matchStrings": [
//       "chart:\n\\s*repository: (?<repository>.*?)\n\\s*name: (?<depName>.*?)\n\\s*version: (?<currentValue>.*)$"
//     ],
//       "datasourceTemplate": "helm"
// },
