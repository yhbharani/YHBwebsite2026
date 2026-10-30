import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/site';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer>
      <span>Designed and built by {{ profile.name }}</span>
      <nav aria-label="Footer">
        <a routerLink="/">Home</a>
        <a routerLink="/about">About</a>
      </nav>
      <span>{{ profile.location }} · © {{ year }}</span>
    </footer>
  `,
  styles: `
    :host { display: block; padding: 0 20px 48px; }
    footer {
      max-width: 880px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px;
      padding-top: 24px; border-top: 1px solid var(--pf-line); font-size: 13px; color: var(--pf-muted-2);
    }
    nav { display: flex; gap: 16px; }
    a { color: inherit; text-decoration: none; }
    a:hover { color: var(--pf-ink); text-decoration: underline; }
  `,
})
export class SiteFooter {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
