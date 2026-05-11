const fs = require("fs");
const path = require("path");

const PKG = path.resolve(__dirname, "..", "package.json");
const BAK = path.resolve(__dirname, "..", ".package.json.bak");
const mode = process.argv[2];

if (mode === "strip") {
  fs.copyFileSync(PKG, BAK);
  const pkg = JSON.parse(fs.readFileSync(PKG, "utf8"));
  for (const s of ["prepare", "prepack", "postpack"]) delete pkg.scripts[s];
  fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2) + "\n");
} else if (mode === "restore") {
  if (fs.existsSync(BAK)) fs.renameSync(BAK, PKG);
} else {
  throw new Error("usage: prepack-package-json.cjs strip|restore");
}
