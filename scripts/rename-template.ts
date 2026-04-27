import { readFile, writeFile } from "node:fs/promises";

const [, , nextName] = process.argv;

if (!nextName) {
  console.error("Usage: bun run rename-template -- <new-package-name>");
  process.exit(1);
}

const githubOwner = "fardjad";
const templateName = "changeme";

type PackageJson = {
  bin?: Record<string, string>;
  bugs?: { url?: string };
  homepage?: string;
  name?: string;
  repository?: { type?: string; url?: string };
};

async function updatePackageJson(name: string): Promise<void> {
  const file = new URL("../package.json", import.meta.url);
  const packageJson = JSON.parse(await readFile(file, "utf8")) as PackageJson;

  packageJson.name = name;
  packageJson.bin = { [name]: "./dist/cli.mjs" };
  packageJson.repository = {
    type: "git",
    url: `git+https://github.com/${githubOwner}/${name}.git`,
  };
  packageJson.homepage = `https://github.com/${githubOwner}/${name}#readme`;
  packageJson.bugs = {
    url: `https://github.com/${githubOwner}/${name}/issues`,
  };

  await writeFile(file, `${JSON.stringify(packageJson, null, 2)}\n`);
}

async function replaceInFile(path: string, name: string): Promise<void> {
  const file = new URL(`../${path}`, import.meta.url);
  const current = await readFile(file, "utf8");
  const updated = current.replaceAll(templateName, name);

  if (updated !== current) {
    await writeFile(file, updated);
  }
}

await updatePackageJson(nextName);
await replaceInFile(".github/workflows/release.yml", nextName);
await replaceInFile("README.md", nextName);
