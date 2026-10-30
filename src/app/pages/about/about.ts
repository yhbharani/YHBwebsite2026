import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { HERO_LOGOS, PROFILE } from '../../data/site';
import { Button } from '../../shared/button';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Icon],
  template: `
    <div class="page">
      <header class="hero">
        <img [src]="profile.avatar" [alt]="profile.name" width="120" height="120" class="avatar" />
        <div class="hero-text">
          <h1 class="title">Hi, I'm {{ firstName }}.</h1>
          <p class="lead">{{ profile.tagline }}</p>
          <p class="loc"><app-icon name="map-pin" [size]="16" /> {{ profile.role }} · {{ profile.location }}</p>
        </div>
      </header>

      <section class="block">
        <h2>About me</h2>
        <div class="body">
          <!-- TODO: replace with your own bio. -->
          <p>TODO: A short intro: what kind of problems you like, how you work, and what you're looking for next.</p>
          <p>TODO: A second paragraph on your path from architecture at IIT Roorkee into product design.</p>
        </div>
      </section>

      <section class="block">
        <h2>Places I've learned &amp; worked</h2>
        <ul class="logos">
          <li><img [src]="logos.seal" alt="IIT Roorkee" /></li>
          @for (t of logos.tiles; track t.light) {
            <li>
              <img class="light" [src]="t.light" [alt]="''" />
              <img class="dark" [src]="t.dark" [alt]="''" />
            </li>
          }
        </ul>
        <p class="visually-hidden">{{ logos.label }}</p>
      </section>

      <section class="block">
        <h2>What I do</h2>
        <ul class="skills">
          @for (s of profile.skills; track s) {
            <li class="pf-chip">{{ s }}</li>
          }
        </ul>
      </section>

      <div class="cta">
        <a appButton size="lg" routerLink="/" fragment="contact">Get in touch <app-icon name="arrow-right" /></a>
        <a appButton size="lg" variant="secondary" [href]="profile.resumeUrl" target="_blank" rel="noopener noreferrer">
          Resume <app-icon name="file-user" />
        </a>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; padding: clamp(16px, 4vw, 48px) 20px clamp(80px, 10vw, 140px); }
    .page { max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(48px, 7vw, 80px); }
    .hero { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(20px, 4vw, 40px); }
    .avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }
    .hero-text { flex: 1 1 360px; display: flex; flex-direction: column; gap: 14px; }
    .title {
      font-family: var(--font-head); font-weight: 700; font-size: clamp(40px, 6vw, 68px); line-height: 1; color: var(--pf-ink);
    }
    .lead { font-family: var(--font-head); font-weight: 600; font-size: clamp(20px, 2.6vw, 26px); line-height: 1.4; color: var(--pf-ink); }
    .loc { display: flex; align-items: center; gap: 8px; color: var(--pf-muted); }
    .block { display: grid; grid-template-columns: minmax(0, 220px) minmax(0, 1fr); gap: 24px; }
    @media (max-width: 720px) { .block { grid-template-columns: 1fr; gap: 16px; } }
    .block h2 { font-family: var(--font-head); font-weight: 700; font-size: clamp(24px, 3vw, 32px); line-height: 1.1; color: var(--pf-ink); }
    .body { display: flex; flex-direction: column; gap: 1em; }
    .body p { font-size: 17px; line-height: 1.7; color: var(--pf-body); max-width: 62ch; }
    .logos {
      list-style: none; margin: 0; padding: 0; display: grid; gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); align-items: center;
    }
    .logos li { display: flex; justify-content: center; }
    .logos img { max-height: 64px; width: auto; }
    .logos .light { display: var(--pf-light-disp); }
    .logos .dark { display: var(--pf-dark-disp); }
    .skills { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .skills .pf-chip { font-size: 14px; padding: 10px 16px; }
    .cta { display: flex; flex-wrap: wrap; gap: 12px; }
  `,
})
export default class About {
  protected readonly profile = PROFILE;
  protected readonly logos = HERO_LOGOS;
  protected readonly firstName = PROFILE.name.split(' ')[0];

  constructor() {
    inject(SeoService).set({
      title: 'About',
      description: `${PROFILE.name} is a ${PROFILE.role} based in ${PROFILE.location}.`,
      path: '/about',
    });
  }
}
