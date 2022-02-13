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

run: check-cmd
run: ## Run renovate locally name=ex5
	@docker run --rm -it \
		-e RENOVATE_TOKEN \
		-e DOCKER_HUB_USERNAME \
		-e DOCKER_HUB_TOKEN \
		-e LOG_LEVEL=$(LOG_LEVEL) \
		-e EXCERCISE_NAME=$(name) \
		-v ${PWD}/.cache:/tmp/renovate \
		-v ${PWD}/playground/$(name)/config.js:/usr/src/app/config.js \
		-v ${PWD}/config/repos.json:/usr/src/app/repos.json \
		-v ${PWD}/playground/$(name)/regexManagers.js:/usr/src/app/regexManagers.js \
		-v ${PWD}/playground/$(name)/packageRules.js:/usr/src/app/packageRules.js \
		$(CI_RENOVATE_IMAGE) renovate --dry-run=false

check-cmd:
ifndef name
		$(error The name variable is not set)
endif
ifneq ($(findstring ex,$(name)),ex)
		$(error The name variable does not contain 'ex')
endif

skeleton: ## Render exercise skeleto from templates locally and create them in sandbox foler.
skeleton: check-cmd
	@mkdir playground/$(name)
	@cp -r playground/template/ playground/$(name)/
	@tree playground/$(name)
	@mkdir sandbox/$(name)
	@touch sandbox/$(name)/.gitkeep
	@touch exercises/$(name).README.md
	@echo -e "# Exercise $(name). TODO(description) \n\n## Contents \n\n## Resources" >> exercises/$(name).README.md

run5: ## Run exercise 5
	@echo "Run Exercise 5"
	@$(MAKE) run name=ex5
