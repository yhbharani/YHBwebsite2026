import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { Button } from '../shared/button';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button],
  template: `
    <div class="wrap">
      <p class="code">404</p>
      <h1>This page went to collect magnets.</h1>
      <p class="sub">The link may be old, or the page has moved.</p>
      <a appButton routerLink="/">Back home</a>
    </div>
  `,
  styles: `
    :host { display: block; padding: 0 20px; }
    .wrap { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center; }
    .code { font-family: var(--font-head); font-weight: 700; font-size: 96px; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px var(--pf-ink); }
    h1 { font-family: var(--font-head); font-weight: 700; font-size: clamp(26px, 4vw, 40px); color: var(--pf-ink); }
    .sub { color: var(--pf-muted); margin-bottom: 8px; }
  `,
})
export default class NotFound {
  constructor() {
    inject(SeoService).set({ title: 'Page not found', description: 'This page does not exist.', path: '/404' });
  }
}
