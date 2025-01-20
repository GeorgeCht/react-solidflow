# Contributing

Thanks for investing your time in contributing to SolidFlow! ✨

## Getting started

This repository is a [monorepo](https://github.com/vercel/turborepo) that uses
[Turbo](https://turbo.build/) to manage multiple packages in a single repo.

Also, uses [bun](https://bun.sh/) as the package manager.

1. Clone the repo using `git clone https://github.com/georgecht/react-solidflow.git`
2. Install dependencies using `bun install`
3. Build the project using `bun run build`

## Repository structure

```bash
├─ packages
│    └─ solidflow
│    └─ tsconfig
├─ apps
│    └─ docs
├─ examples
│    └─ ...
```

## Before creating a pull request


1. Use `bun commit` for commiting changes; all commits must be [commitizen-friendly](https://github.com/commitizen/cz-cli).
2. Make sure all tests pass with `bun run test`
3. Lint your code by running `bun run check`.
4. If you are adding a new library feature on the `@solidflow/react-solidflow` package, make sure to bump the version by running `bun bump`.