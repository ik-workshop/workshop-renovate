const fs = require("fs");
const path = require("path");
const {
  RENOVATE_BOT_USER,
  RENOVATE_STOP_UPDATING_LABEL,
} = require("../lib/constants");

const defaultAssignees = {
  assignees: [RENOVATE_BOT_USER],
};

const defaultLabels = [
  "maintenance::dependency",
  "type::maintenance",
  "automation:bot-authored",
];

const epBaseConfig = {
  reviewers: ["godfat-gitlab", "ddieulivol", "ashmckenzie", "rymai"],
  reviewersSampleSize: 1,
  labels: [...defaultLabels, "backend", "Engineering Productivity"],
};

const baseConfig = {
  dependencyDashboard: true,
  includeForks: true,
  automerge: false,
  labels: ["frontend", ...defaultLabels],
  lockFileMaintenance: { enabled: false, schedule: [] },
  enabledManagers: ["npm"],
  prConcurrentLimit: 20,
  ...defaultAssignees,
  reviewers: [
    "dmishunov",
    "ealcantara",
    "pgascouvaillancourt",
    "mikegreiling",
    "ohoral",
    "markrian",
    "svedova",
  ],
  assignAutomerge: true,
  reviewersSampleSize: 2,
  // Only include the first level of dependency files
  includePaths: ["*"],
  // Dedupe yarn dependencies
  postUpdateOptions: ["yarnDedupeFewer"],
  stopUpdatingLabel: RENOVATE_STOP_UPDATING_LABEL,
  prBodyNotes: [
    `MR created with the help of [${process.env.CI_PROJECT_PATH}](${process.env.CI_PROJECT_URL})`,
  ],
  hostRules: [
    process.env.GITHUB_TOKEN
      ? {
          matchHost: "github.com",
          token: process.env.GITHUB_TOKEN,
        }
      : [],
    process.env.RENOVATE_TOKEN
      ? {
          matchHost: "gitlab.com",
          token: process.env.RENOVATE_TOKEN,
        }
      : [],
  ].flat(),
};

const updateNothing = {
  matchPackagePatterns: [".*"],
  enabled: false,
};

const updateGitLabScope = {
  enabled: true,
  rangeStrategy: "auto",
};

const updateGitLabUIandSVG = {
  ...updateGitLabScope,
  matchPackageNames: ["@gitlab/ui", "@gitlab/svgs"],
  groupName: "GitLab UI/SVG",
};

const ESLint = {
  ...updateGitLabScope,
  matchPackageNames: ["eslint"],
  matchPackagePatterns: ["eslint-.+"],
  excludePackageNames: ["@gitlab/eslint-plugin"],
  reviewers: ["markrian", "vitallium"],
  groupName: "ESLint and related",
};

const Stylelint = {
  ...updateGitLabScope,
  matchPackageNames: ["@gitlab/stylelint-config"],
  matchPackagePatterns: ["stylelint-.+"],
  reviewers: ["vitallium", "pgascouvaillancourt"],
  groupName: "Stylelint and related",
};

const updateGitLabScopeDev = {
  ...updateGitLabScope,
  matchPackagePatterns: ["@gitlab/.*"],
  excludePackageNames: [
    ...updateGitLabUIandSVG.matchPackageNames,
    "@gitlab/visual-review-tools",
    ...Stylelint.matchPackageNames,
  ],
  groupName: "GitLab Packages",
};

const updateOnlyGitLabScopePackageRules = [
  updateNothing,
  updateGitLabUIandSVG,
  ESLint,
  Stylelint,
  updateGitLabScopeDev,
];

const updateOnlyGitLabScope = {
  ...baseConfig,
  packageRules: updateOnlyGitLabScopePackageRules,
};

const updateDOMPurify = {
  matchPackageNames: ["dompurify"],
  rangeStrategy: "bump",
  enabled: true,
  reviewers: ["djadmin", "markrian"],
};

const semanticPrefixFixDepsChoreOthers = [
  {
    matchPackagePatterns: ["*"],
    semanticCommitType: "chore",
  },
  {
    matchDepTypes: ["dependencies", "require"],
    semanticCommitType: "fix",
  },
];

const enableWithBumpStrategy = {
  rangeStrategy: "bump",
  enabled: true,
};

/**
 *
 * @param repositories
 * @param serverConfig
 * @returns Renovate Config
 */
function createServerConfig(repositories, serverConfig = {}) {
  return {
    dryRun: (process.env.DRY_RUN ?? "true") === "true" ? "full" : null,
    autodiscover: false,
    logFile: path.join(__dirname, "..", "renovate-log.txt"),
    logFileLevel: "debug",
    platform: "gitlab",
    onboarding: false,
    requireConfig: "ignored",
    printConfig: false,
    renovateMetaCommentTemplate: fs.readFileSync(
      path.join(__dirname, "comment_template.md"),
      "utf-8"
    ),
    gitAuthor: "GitLab Renovate Bot <gitlab-bot@gitlab.com>",
    ...serverConfig,
    repositories: repositories,
  };
}

module.exports = {
  createServerConfig,
  defaultAssignees,
  defaultLabels,
  epBaseConfig,
  baseConfig,
  updateNothing,
  updateGitLabUIandSVG,
  updateGitLabScope,
  ESLint,
  Stylelint,
  updateGitLabScopeDev,
  updateDOMPurify,
  semanticPrefixFixDepsChoreOthers,
  updateOnlyGitLabScope,
  updateOnlyGitLabScopePackageRules,
  enableWithBumpStrategy,
};
