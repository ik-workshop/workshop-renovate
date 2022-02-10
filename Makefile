SHELL = /bin/sh -o pipefail
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

CI_RENOVATE_IMAGE := renovate/renovate:31.72-slim
LOG_LEVEL := info

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: ## Setup dependencies
	@brew bundle

hooks: ## install pre commit.
	@pre-commit install
	@pre-commit gc
	@pre-commit autoupdate

validate: ## Validate files with pre-commit hooks
	@pre-commit run --all-files

run: ## Run renovate locally
	docker run --rm -it \
		-e RENOVATE_TOKEN \
		-e DOCKER_HUB_USERNAME \
		-e DOCKER_HUB_TOKEN \
		-e LOG_LEVEL=$(LOG_LEVEL) \
		-v ${PWD}/cache:/tmp/renovate \
		-v ${PWD}/config/config.js:/usr/src/app/config.js \
		-v ${PWD}/config/repos.json:/usr/src/app/repos.json \
		-v ${PWD}/config/regexManagers.js:/usr/src/app/regexManagers.js \
		-v ${PWD}/config/packageRules.js:/usr/src/app/packageRules.js \
		$(CI_RENOVATE_IMAGE) renovate --dry-run=true
