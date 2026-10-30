import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PROFILE } from '../data/site';
import { ThemeToggle } from '../shared/theme-toggle';

/** Slim header for inner pages (the home page uses the ID card instead). */
@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, ThemeToggle],
  template: `
    <nav class="bar" aria-label="Main">
      <a routerLink="/" class="me">
        <img [src]="profile.avatar" alt="" width="36" height="36" />
        <span>{{ profile.name }}</span>
      </a>
      <div class="links">
        <a routerLink="/" fragment="projects">Work</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/" fragment="contact">Contact</a>
        <app-theme-toggle class="toggle" />
      </div>
    </nav>
  `,
  styles: `
    :host { display: block; padding: 20px; }
    .bar {
      max-width: 880px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;
      gap: 16px; flex-wrap: wrap; padding: 10px 12px 10px 10px; border-radius: 999px; background: var(--pf-shell);
    }
    .me {
      display: flex; align-items: center; gap: 10px; color: var(--pf-ink); text-decoration: none;
      font-family: var(--font-head); font-weight: 700; font-size: 18px;
    }
    .me img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
    .links { display: flex; align-items: center; gap: clamp(12px, 2.4vw, 24px); font-size: 15px; }
    .links a { color: var(--pf-muted); text-decoration: none; transition: color var(--dur); }
    .links a:hover, .links a.active { color: var(--pf-ink); }
    .toggle { font-size: 13px; gap: 8px; }
    @media (max-width: 560px) {
      .bar { border-radius: 24px; justify-content: center; }
      .toggle { display: none; }
    }
  `,
})
export class SiteHeader {
  protected readonly profile = PROFILE;
}
