#!/usr/bin/env node
// @ts-check
const fs = require(`fs`);
const { sync: glob } = require(`glob`);
const exec = require(`x-exec`).default;
const { c, log, green } = require(`x-chalk`);

let numSteps = 3;
let step = 1;

const convertDates = process.argv.includes(`--convert-dates-to-string`);
if (convertDates) {
  numSteps += 1;
}

let success = true;

log(c`{gray ${step++}/${numSteps}} {magenta Downloading schema...}`);
success = exec.out(
  `apollo client:download-schema --endpoint=http://127.0.0.1:8080/graphql ./schema.graphql`,
  process.cwd(),
);

if (!success) {
  process.exit(1);
}

log(c`{gray ${step++}/${numSteps}} {magenta Downloading types...}`);
exec.exit(`rm -rf src/graphql`, process.cwd());
success = exec.out(
  `npx apollo client:codegen --outputFlat --passthroughCustomScalars --localSchemaFile=schema.graphql --target=typescript --tagName=gql src/graphql`,
  process.cwd(),
);

if (!success) {
  process.exit(1);
}

log(c`{gray ${step++}/${numSteps}} {magenta Cleaning up...}`);
exec(`rm -f schema.graphql`, process.cwd());
exec(`npm run format`, process.cwd());
exec(`npm run lint:fix`, process.cwd());

if (convertDates) {
  log(c`{gray ${step++}/${numSteps}} {magenta Converting dates to string...}`);
  convertDatesToString();
}

green(`Codegen complete!\n`);
process.exit(0);

function convertDatesToString() {
  const files = glob(`${process.cwd()}/src/graphql/*.ts`);

  if (files.length === 0) {
    console.error(`No graphql files found by \`fix-timestamp-types.js\` script`);
    console.error(`Did you run the script from somewhere other than the project root?`);
    process.exit(1);
  }

  for (const file of files) {
    const content = fs.readFileSync(file, `utf-8`);
    fs.writeFileSync(
      file,
      content.replace(
        /(created|updated|deleted)At: Date \| null;/gm,
        `$1At: string | null`,
      ),
    );
  }
}
