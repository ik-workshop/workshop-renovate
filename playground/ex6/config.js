'use strict';

const Fs = require('fs');
const { rules } = require('./packageRules');
const { managers } = require('./regexManagers');

if (!Fs.existsSync('repos.json')) {
  throw new Error('Missing enabled-repos.json - please create it by running "npm run generate-enabled".');
}

if (!process.env.DOCKER_HUB_TOKEN) {
  throw new Error('Missing "DOCKER_HUB_TOKEN"');
}

const defaultRules = [
  {
    "matchUpdateTypes": ["major", "minor", "patch", "pin", "digest"],
    "addLabels": [`${process.env.EXCERCISE_NAME}`, "{{depType}}", "{{datasource}}", "{{updateType}}"],
    "commitMessageSuffix": `[${process.env.EXCERCISE_NAME}]`
  },
]

module.exports = {
  "platform": "github",
  "token": process.env.RENOVATE_TOKEN,
  "repositories": JSON.parse(Fs.readFileSync('repos.json', 'utf8')),
  "logLevel": process.env.LOG_LEVEL,
  "gitAuthor": "Renovate Bot <bot@renovateapp.com>",
  "prConcurrentLimit": 0,
  "prHourlyLimit": 0,
  "pruneStaleBranches": true,
  "recreateClosed": true,
  "onboarding": false,
  "requireConfig": false,
  "hostRules": [
    {
      "hostType": "docker",
      "username": process.env.DOCKER_HUB_USERNAME,
      "password": process.env.DOCKER_HUB_TOKEN
    }
  ],
  "semanticCommits": "enabled",
  "baseBranches": ["master"],
  "printConfig": false,
  "rebaseWhen": "behind-base-branch",
  "labels": ["renovate"],
  "additionalBranchPrefix": "{{packageFileDir}}-",
  "packageRules": [...defaultRules, ...rules],
  "regexManagers": managers,
}
