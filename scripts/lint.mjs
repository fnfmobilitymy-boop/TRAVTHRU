// Dependency-free syntax lint for this JavaScript project (not a TypeScript checker).
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const files = ['vite.config.js','playwright.config.js'];
for (const dir of ['src','scripts','tests']) {
 for (const name of fs.readdirSync(dir)) if (/\.(?:js|mjs)$/.test(name)) files.push(`${dir}/${name}`);
}
for (const file of files) {
 const result = spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
 if (result.status !== 0) throw Error(`${file}: ${result.stderr}`);
}
for (const file of ['package.json','package-lock.json','vercel.json']) JSON.parse(fs.readFileSync(file,'utf8'));
const python = spawnSync('python3',['-c',"import ast,pathlib; ast.parse(pathlib.Path('scripts/localize.py').read_text())"],{encoding:'utf8'});
if (python.status !== 0) throw Error(python.stderr);
console.log(`PASS syntax lint: ${files.length} JavaScript files, 3 JSON files and Python localizer`);
