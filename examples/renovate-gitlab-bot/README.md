# renovate-gitlab-bot

> Currently open MRs can be [found here](https://gitlab.com/dashboard/merge_requests?scope=all&utf8=%E2%9C%93&state=opened&author_username=gitlab-dependency-update-bot)

The bot uses [renovatebot](https://github.com/renovatebot/renovate) to
automatically create MRs for updating dependencies.

Due to limitations with upstream renovate regarding forked workflows we are maintaining a fork of renovate:
https://gitlab.com/gitlab-org/frontend/renovate-fork

The following repositories are currently being updated automatically.

<!-- rep -->

- [gitlab-renovate-forks/cluster-integration/auto-build-image](https://gitlab.com/gitlab-renovate-forks/cluster-integration/auto-build-image)
- [gitlab-renovate-forks/cluster-integration/auto-deploy-image](https://gitlab.com/gitlab-renovate-forks/cluster-integration/auto-deploy-image)
- [gitlab-renovate-forks/cluster-integration/helm-install-image](https://gitlab.com/gitlab-renovate-forks/cluster-integration/helm-install-image)
- [gitlab-renovate-forks/customers-gitlab-com](https://gitlab.com/gitlab-renovate-forks/customers-gitlab-com)
- [gitlab-renovate-forks/design.gitlab.com](https://gitlab.com/gitlab-renovate-forks/design.gitlab.com)
- [gitlab-renovate-forks/gitaly](https://gitlab.com/gitlab-renovate-forks/gitaly)
- [gitlab-renovate-forks/gitlab-development-kit](https://gitlab.com/gitlab-renovate-forks/gitlab-development-kit)
- [gitlab-renovate-forks/gitlab-docs](https://gitlab.com/gitlab-renovate-forks/gitlab-docs)
- [gitlab-renovate-forks/gitlab-svgs](https://gitlab.com/gitlab-renovate-forks/gitlab-svgs)
- [gitlab-renovate-forks/gitlab-ui](https://gitlab.com/gitlab-renovate-forks/gitlab-ui)
- [gitlab-renovate-forks/gitlab-vscode-extension](https://gitlab.com/gitlab-renovate-forks/gitlab-vscode-extension)
- [gitlab-renovate-forks/gitlab](https://gitlab.com/gitlab-renovate-forks/gitlab)
- [gitlab-renovate-forks/status-page](https://gitlab.com/gitlab-renovate-forks/status-page)
- [gitlab-renovate-forks/triage-ops](https://gitlab.com/gitlab-renovate-forks/triage-ops)

<!-- rep -->

For more details, refer to our documentation:

- [Process](./docs/process.md) describing how our update flow works
- [Setting up a new project](./docs/setting-up-a-new-project.md)
