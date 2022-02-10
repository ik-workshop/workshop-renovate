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

module.exports = {
  "platform": "github",
  "token": process.env.RENOVATE_TOKEN,
  "repositories": JSON.parse(Fs.readFileSync('repos.json', 'utf8')),
  "logLevel": process.env.LOG_LEVEL,
  "gitAuthor": "Renovate Bot <bot@renovateapp.com>",
  "prConcurrentLimit": 0,
  "prHourlyLimit": 0,
  "pruneStaleBranches": false,
  "recreateClosed": false,
  "onboarding": false,
  "requireConfig": false,
  "onboardingConfig": {
    "extends": [
      ":ignoreUnstable",
      ":rebaseStalePrs",
      "workarounds:all",
      ":semanticPrefixFixDepsChoreOthers",
      ":autodetectPinVersions",
      "group:monorepos",
      "group:recommended"
    ]
  },
  "hostRules": [
    {
      "hostType": "docker",
      "username": process.env.DOCKER_HUB_USERNAME,
      "password": process.env.DOCKER_HUB_TOKEN
    }
  ],
  "semanticCommits": "enabled",
  "gitAuthor": "renovate-bot <paas@hollandandbarrett.com>",
  "baseBranches": ["master", "main"],
  "printConfig": false,
  "rebaseWhen": "behind-base-branch",
  "labels": ["renovate"],
  "vulnerabilityAlerts": {
    "enabled": true,
    "addLabels": ["vulnerability"]
  },
  "additionalBranchPrefix": "{{packageFileDir}}-",
  "packageRules": rules,
  "regexManagers": managers,
}
