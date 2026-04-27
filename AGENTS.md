# AGENTS.md

Reusable TypeScript template instructions for a library plus CLI project.

## Runtime and Tooling

- Use Bun for development, local tooling, scripts, and tests.
- Target Node.js for distribution and end-user execution.
- The preferred way to ship code is to create a bundle that targets Node.js.
- Use `bun build --target=node ...` for distributable library and CLI outputs when practical.
- Ship both ESM and CJS library bundles plus a Node CLI entrypoint unless the user asks otherwise.
- Release workflows may additionally compile standalone CLI binaries for GitHub releases.
- Do not require Bun for end-users unless there is a concrete project-level reason.
- Use `bun <file>` instead of `node <file>` or `ts-node <file>` during development.
- Use `bun test` instead of `jest` or `vitest`.
- Use `bun build` instead of introducing extra bundlers unless the repo has a concrete need they cover.
- Use `bun install` instead of `npm install`, `yarn install`, or `pnpm install`.
- Use `bun run <script>` instead of `npm run <script>`, `yarn run <script>`, or `pnpm run <script>`.
- Use `bun x <package> <command>` instead of `npx <package> <command>`.
- Bun automatically loads `.env`, so do not add `dotenv`.

## APIs

- Prefer Bun APIs in development tooling, scripts, tests, and other non-distributed codepaths.
- Do not put Bun-only runtime modules in the shipped library or CLI path when targeting Node.js distribution.
- Bun-specific modules such as `bun:sqlite`, `Bun.redis`, and `Bun.sql` are acceptable only when they are isolated to Bun-only codepaths or replaced during bundling.
- For distributed runtime code, prefer libraries and APIs that work under plain `node`.
- Prefer `Bun.file` over `node:fs` `readFile` and `writeFile` where practical in Bun-only codepaths.
- Prefer `Bun.$\`...\``over`execa` in Bun-only tooling and scripts.

## Project Shape

- Keep the template minimal unless the user asks for product-specific logic.
- The public library surface should stay rooted at the package root export by default.
- The CLI should remain a small wrapper around library code by default.
- Keep source under `src/` and helper tooling under `scripts/`.
- If the package or CLI name changes, update package metadata, workflow references, and template naming references consistently.

## Quality Tools

- Use Biome for JavaScript, TypeScript, and JSON linting and formatting.
- Use dprint for Markdown formatting and `g-plane/pretty_yaml` for YAML formatting.
- Prefer the existing `check`, `fix`, and `typecheck` scripts over ad hoc tool commands when validating changes.

## Testing

- Use `bun test` to run tests.
- Prefer Bun's built-in test API:

```ts
import { expect, test } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Distribution

- Build distributed artifacts for Node.js consumption, especially for published packages and CLI binaries.
- Prefer output that runs under plain `node` without requiring Bun-specific runtime behavior.
- Keep Bun-specific conveniences in development codepaths unless they are compiled away in the Node-targeted bundle.
- If a runtime feature depends on Bun-only modules, isolate it behind an adapter or provide a separate Bun-specific build.

## References

- Bun API docs are available locally under `node_modules/bun-types/docs/**.mdx`.
