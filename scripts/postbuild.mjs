// Firebase Hosting serves /404.html for unknown URLs; copy the prerendered 404 page there.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/portfolio/browser/404/index.html', 'dist/portfolio/browser/404.html');
console.log('postbuild: wrote dist/portfolio/browser/404.html');
