/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.rules = [
  {
    "matchPaths": ["*.env"],
    "datasources": ["helm"],
    "groupName": 'helmenv'
  }
];
