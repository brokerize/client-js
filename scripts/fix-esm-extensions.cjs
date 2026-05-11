const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "dist");
const SPEC = /(\bfrom\s*|\bimport\s*\(\s*)(['"])(\.[^'"]*)\2/g;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (p === path.join(ROOT, "cjs")) continue;
      out.push(...walk(p));
    } else if (e.isFile() && p.endsWith(".js")) {
      out.push(p);
    }
  }
  return out;
}

for (const file of walk(ROOT)) {
  const dir = path.dirname(file);
  const src = fs.readFileSync(file, "utf8");
  const next = src.replace(SPEC, (m, kw, q, spec) => {
    if (/\.(m?js|cjs|json)$/.test(spec)) return m;
    let isDir = false;
    try {
      isDir = fs.statSync(path.resolve(dir, spec)).isDirectory();
    } catch {}
    return `${kw}${q}${spec}${isDir ? "/index.js" : ".js"}${q}`;
  });
  if (next !== src) fs.writeFileSync(file, next);
}
