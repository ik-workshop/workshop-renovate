#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const configFiles = glob.sync(
  path.join(__dirname, "..", "renovate", "**", "*.config.js")
);

const repositories = configFiles.map(require).flatMap((x) => x.repositories);

console.log(repositories);

const listItem = (path) => `- [${path}](https://gitlab.com/${path})`;

const list = [
  ...new Set(
    repositories.map((x) => {
      return listItem(x?.repository);
    })
  ),
]
  .sort()
  .join("\n");

const delimiter = "<!-- rep -->";

const regex = new RegExp(`${delimiter}[\\s\\S]+${delimiter}`, "gm");

const section = `
${delimiter}

${list}

${delimiter}
`;

const readme = fs.readFileSync("README.md", "utf8");

fs.writeFileSync("README.md", readme.replace(regex, section));

console.warn(list);
