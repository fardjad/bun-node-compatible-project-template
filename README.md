# changeme

Reusable TypeScript template for a library plus CLI.

## What this template provides

- Bun for development, scripts, installs, tests, and bundling
- Node-targeted published artifacts
- Dual library output: ESM and CJS
- One CLI entrypoint published to npm
- Standalone CLI binaries for GitHub releases
- Biome for JS/TS/JSON linting and formatting
- dprint for Markdown and YAML formatting

## Quick start

Install dependencies:

```sh
bun install
```

Rename the template:

```sh
bun run rename-template -- your-package-name
```

The rename helper updates:

- `package.json` package metadata and CLI name
- `.github/workflows/release.yml` release artifact names and titles
- `README.md` package-name placeholders

## Scripts

```sh
bun run check
bun run fix
bun run typecheck
bun run test
bun run build
```

## Build output

- `dist/index.mjs`
- `dist/index.cjs`
- `dist/index.d.ts`
- `dist/cli.mjs`

## GitHub Actions

The template includes workflows for:

- CI checks on `main` and pull requests
- Version-driven releases
- npm publish on GitHub release
- automatic Bun dependency maintenance
- automatic approval of maintenance PRs

Maintenance workflows require:

- `AUTO_MAINTENANCE_APP_ID` GitHub Actions variable
- `AUTO_MAINTENANCE_APP_PRIVATE_KEY` GitHub Actions secret

## Notes

- Bun is used for development, but shipped npm artifacts target Node.js.
- The library export is intentionally minimal and the CLI is just a placeholder.
- Update the description and any other placeholders before publishing.
