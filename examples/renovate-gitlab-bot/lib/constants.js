module.exports = {
  RENOVATE_PROJECT_ID: "15445883",
  RENOVATE_BOT_USER: "gitlab-dependency-update-bot",
  DRY_RUN: (process.env.DRY_RUN ?? "true") === "true",
  RENOVATE_STOP_UPDATING_LABEL: "automation:bot-no-updates",
};
