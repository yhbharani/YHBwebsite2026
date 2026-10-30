import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <a class="skip" href="#main">Skip to content</a>
    @if (!isHome()) {
      <app-site-header />
    }
    <main id="main">
      <router-outlet />
    </main>
    <app-site-footer />
  `,
  styles: `
    .skip {
      position: absolute; left: 12px; top: -48px; z-index: 50; padding: 10px 16px; border-radius: 999px;
      background: var(--pf-ink); color: var(--pf-bg); text-decoration: none; transition: top var(--dur);
    }
    .skip:focus { top: 12px; }
  `,
})
export class App {
  private readonly router = inject(Router);
  protected readonly isHome = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => this.router.parseUrl(e.urlAfterRedirects).root.children['primary'] === undefined),
    ),
    { initialValue: true },
  );
}
