// @ts-check
const fs = require(`fs`);
const { sync: glob } = require(`glob`);

const files = glob(`./src/graphql/*.ts`);

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
