import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './data/site';

/** Every page is prerendered to static HTML at build time (no server needed on Firebase). */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((p) => ({ slug: p.slug })),
  },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
