# Documentation

## Configure CI/CD variables

It is also recommended to configure a (GitHub.com Personal Access Token)[https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token] (scopes: read_user, repo) as GITHUB_COM_TOKEN so that your bot can make authenticated requests to github.com for Changelog retrieval as well as for any dependency that uses GitHub tags.
Without such a token, github.com's API will rate limit requests and make such lookups unreliable.

## Resources

- [Gitlab Runner](https://gitlab.com/renovate-bot/renovate-runner)
