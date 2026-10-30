// Runs after every build.
import { copyFileSync, writeFileSync } from 'node:fs';
const out = 'dist/portfolio/browser';
// Firebase Hosting and GitHub Pages both serve /404.html for unknown URLs.
copyFileSync(`${out}/404/index.html`, `${out}/404.html`);
// Tell GitHub Pages not to run Jekyll over the files.
writeFileSync(`${out}/.nojekyll`, '');
console.log('postbuild: wrote 404.html and .nojekyll');
