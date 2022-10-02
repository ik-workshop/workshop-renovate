# Setting up a new project

You can only do steps 1-3 if you are maintainer of this project and you've got access to the private 1Password Vault. Otherwise plesae contact a maintainer.

1.  Open a private tab or different browser and log in with the
    [@gitlab-renovate-bot](https://gitlab.com/gitlab-renovate-bot) credentials from 1Password.
2.  Locate the project you want to renovate and fork it into the [gitlab-renovate-forks]
3.  Go into the project settings and set up mirroring (Settings -> Repository).

    1. You need to enter the upstream repo
    2. Enable "overwrite diverged branches" (should never happen, but upstream should be the single source of truth)
    3. Enable "only protected branches" which probably helps with performance

    ![](./mirror-setup.png)

4.  Create an MR which adds your fork to [the config](../renovate/).

[gitlab-renovate-forks]: https://gitlab.com/gitlab-renovate-forks
