# Frequently asked questions

> What happens if the renovate MR runs into conflicts, a newer version of the dependencies is released, etc?

Renovate will update existing Merge Requests:

- if it detects conflicts
- a new version of a dependency has been released

If another Merge Request updated the dependency, renovate will auto-close the existing Merge Request.
