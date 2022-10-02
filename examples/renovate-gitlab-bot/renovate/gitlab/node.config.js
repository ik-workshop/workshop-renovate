const {
  createServerConfig,
  updateNothing,
  updateGitLabUIandSVG,
  ESLint,
  Stylelint,
  updateGitLabScopeDev,
  baseConfig,
  updateDOMPurify,
  updateGitLabScope,
} = require("../shared");
const { prVueMajor2 } = require("../frontend");

const foundationPackages = {
  reviewers: ["leipert", "mikegreiling"],
  addLabels: ["group::foundations", "devops::ecosystem", "section::dev"],
};

const updateGitLabVisualReviewTools = {
  ...updateGitLabScope,
  matchPackageNames: ["@gitlab/visual-review-tools"],
  groupName: "GitLab Visual Review Tools",
};

const updateFrontendObservability = {
  matchPackagePatterns: ["@sentry/browser"],
  rangeStrategy: "bump",
  enabled: true,
  reviewers: ["jivanvl"],
  groupName: "Frontend Observability Packages",
};

module.exports = createServerConfig([
  {
    repository: "gitlab-renovate-forks/gitlab",
    ...baseConfig,
    dependencyDashboardTitle: "Dependency Dashboard (node)",
    rangeStrategy: "bump",
    packageRules: [
      updateNothing,
      updateGitLabUIandSVG,
      updateGitLabVisualReviewTools,
      ESLint,
      Stylelint,
      updateGitLabScopeDev,
      {
        ...foundationPackages,
        matchPackagePatterns: [
          ".*-loader",
          ".*-webpack-plugin",
          "webpack-bundle-analyzer",
        ],
        excludePackageNames: [
          "three-stl-loader",
          "karma-sourcemap-loader",
          "jest-raw-loader",
          "monaco-editor-webpack-plugin",
        ],
        minor: {
          groupName: "Webpack related packages",
        },
        patch: {
          groupName: "Webpack related packages",
        },
        enabled: true,
        rangeStrategy: "bump",
      },
      {
        ...foundationPackages,
        matchPackageNames: ["webpack", "webpack-cli", "webpack-dev-server"],
        enabled: true,
        rangeStrategy: "bump",
        groupName: "Webpack core packages",
      },
      {
        ...foundationPackages,
        matchPackageNames: ["core-js"],
        enabled: true,
        rangeStrategy: "bump",
      },
      {
        ...foundationPackages,
        matchPackageNames: ["commander"],
        enabled: true,
        rangeStrategy: "bump",
      },
      {
        ...foundationPackages,
        matchPackageNames: ["yarn-deduplicate"],
        enabled: true,
        rangeStrategy: "bump",
      },
      {
        ...prVueMajor2,
        reviewers: ["@leipert"],
      },
      {
        reviewers: ["samdbeckham"],
        matchPackageNames: ["vue-virtual-scroll-list"],
        enabled: true,
        rangeStrategy: "bump",
      },
      {
        reviewers: ["pslaughter"],
        matchPackagePatterns: ["^@sourcegraph/*"],
        enabled: true,
        rangeStrategy: "bump",
        groupName: "Sourcegraph",
      },
      {
        reviewers: ["himkp", "dmishunov"],
        matchPackageNames: [
          "monaco-editor",
          "monaco-yaml",
          "monaco-editor-webpack-plugin",
        ],
        enabled: true,
        rangeStrategy: "bump",
        groupName: "Monaco Editor and related packages",
      },
      {
        reviewers: ["himkp", "ealcantara"],
        matchPackageNames: ["tiptap", "tiptap-extensions"],
        matchPackagePatterns: ["@tiptap/.*", "prosemirror-.*"],
        enabled: true,
        rangeStrategy: "bump",
        groupName: "Content Editor Packages",
      },
      updateDOMPurify,
      updateFrontendObservability,
    ],
    semanticCommits: "disabled",
  },
]);
