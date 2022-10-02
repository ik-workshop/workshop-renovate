const factory = require("gitlab-api-async-iterator");
const { RENOVATE_BOT_USER } = require("./constants");
const { log } = require("./logger");
const { GitLabAPI, GitLabAPIIterator } = factory();

const createRenovateMRIterator = (projectId = null) => {
  const url = projectId
    ? `/projects/${projectId}/merge_requests`
    : "/merge_requests";

  return new GitLabAPIIterator(url, {
    author_username: RENOVATE_BOT_USER,
    state: "opened",
    scope: "all",
  });
};

const usermap = {};

async function getUserId(usernameRaw) {
  const username = usernameRaw.startsWith("@")
    ? usernameRaw.substring(1)
    : usernameRaw;

  if (!usermap[username]) {
    log(`Retrieving ID for ${username}`);
    const { data } = await GitLabAPI.get(`/users?username=${username}`);
    usermap[username] = data.find((u) => u.username === username).id;
  }

  return usermap[username];
}

async function getProjectFromSlug(projectSlug) {
  const { data: project } = await GitLabAPI.get(
    `/projects/${encodeURIComponent(projectSlug)}`
  );
  return project;
}

async function forEachFork(repositories, fn) {
  for await (const repo of repositories) {
    const project = await getProjectFromSlug(repo.repository);
    await fn(project);
  }
}

module.exports = {
  GitLabAPI,
  GitLabAPIIterator,
  createRenovateMRIterator,
  getUserId,
  forEachFork,
};
