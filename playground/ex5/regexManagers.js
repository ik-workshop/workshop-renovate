/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

module.exports.managers = [
  {
    // [0-9]{1,2}
    fileMatch: ['.*\/ex5\/amifile.yml', '.*\/ex5\/terraform.tf'],
    matchStrings: [
      '.*amiFilter=(?<lookupName>.*?)\\n(.*currentImageName=(?<currentDigest>.*?)\\n)?(.*\\n)?.*?(?<depName>[a-zA-Z0-9-_:]*)[ ]*?[:|=][ ]*?["|\']?(?<currentValue>ami-[a-z0-9]{17})["|\']?.*',
    ],
    datasourceTemplate: 'aws-machine-image',
    versioningTemplate: 'aws-machine-image',
  },
];
