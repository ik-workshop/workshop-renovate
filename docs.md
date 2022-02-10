<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Documentation](#documentation)
  - [Configure CI/CD variables](#configure-cicd-variables)
  - [Resources](#resources)
    - [ENVCHAIN](#envchain)
    - [Setup Secrets Locally with EnvChain (macOS)](#setup-secrets-locally-with-envchain-macos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Documentation

## Configure CI/CD variables

It is also recommended to configure a (GitHub.com Personal Access Token)[https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token] (scopes: read_user, repo) as GITHUB_COM_TOKEN so that your bot can make authenticated requests to github.com for Changelog retrieval as well as for any dependency that uses GitHub tags.
Without such a token, github.com's API will rate limit requests and make such lookups unreliable.

## Resources

- [Gitlab Runner](https://gitlab.com/renovate-bot/renovate-runner)

### ENVCHAIN

### Setup Secrets Locally with EnvChain (macOS)

```
envchain --set workshop RENOVATE_TOKEN
envchain --set workshop DOCKER_HUB_USERNAME
envchain --set workshop DOCKER_HUB_TOKEN
```

```
ENVCHAIN_NAMESPACE=project1
export $(comm -1 -3 <(env|sort) <(envchain "$ENVCHAIN_NAMESPACE" env|sort))
direnv_load bash -c "source <(cat openrc.sh | grep -vi password); direnv dump"
export RENOVATE_TOKEN ?= $(shell envchain vars env | grep RENOVATE_TOKEN | tr "=" " " |  awk '{print $$2}')
export RENOVATE_DOCKER_HUB_PASSWORD ?= $(shell envchain vars env | grep DOCKER_HUB_PASSWORD | tr "=" " " |  awk '{print $$2}')
```
