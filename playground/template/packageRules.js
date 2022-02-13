/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.rules = [
  {
    "matchUpdateTypes": ["major", "minor", "patch", "pin", "digest"],
    "addLabels": ["{{depType}}", "{{datasource}}", "{{updateType}}"]
  },
];
