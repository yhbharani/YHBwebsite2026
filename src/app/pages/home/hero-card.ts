import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HERO_LOGOS, PROFILE } from '../../data/site';
import { Button } from '../../shared/button';
import { Icon } from '../../shared/icon';
import { SocialIcons } from '../../shared/social-icons';
import { ThemeToggle } from '../../shared/theme-toggle';

/** The hanging ID-card hero. */
@Component({
  selector: 'app-hero-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Icon, SocialIcons, ThemeToggle],
  template: `
    <section class="hero" aria-label="Introduction">
      <div class="lanyard" aria-hidden="true">
        <div class="strap"></div>
        <div class="clip"></div>
        <div class="tab"></div>
      </div>

      <div class="shell">
        <div class="slot-row" aria-hidden="true"><div class="slot"></div></div>

        <div class="card">
          <div class="top">
            <div class="who">
              <img class="avatar" [src]="profile.avatar" [alt]="profile.name" width="72" height="72" />
              <div class="who-text">
                <h1 class="name">{{ profile.name }}</h1>
                <div class="role">{{ profile.role }}</div>
                <app-social-icons />
              </div>
            </div>

            <div class="logos" role="img" [attr.aria-label]="logos.label">
              <img class="seal" [src]="logos.seal" alt="" />
              @for (t of logos.tiles; track t.light) {
                <img
                  class="tile tile--light" [src]="t.light" alt=""
                  [style.left.%]="t.left" [style.top.%]="t.top" [style.width.%]="t.width" [style.animation-delay.ms]="t.delay"
                />
                <img
                  class="tile tile--dark" [src]="t.dark" alt=""
                  [style.left.%]="t.left" [style.top.%]="t.top" [style.width.%]="t.width" [style.animation-delay.ms]="t.delay"
                />
              }
            </div>
          </div>

          <div class="intro">
            <p class="tagline">{{ profile.tagline }}</p>
            <div class="loc"><app-icon name="map-pin" /> {{ profile.location }}</div>
          </div>

          <div class="marquee" aria-label="Skills">
            <ul class="marquee-track">
              @for (s of skillsLoop; track $index) {
                <li class="skill" [attr.aria-hidden]="$index >= profile.skills.length">{{ s }}</li>
              }
            </ul>
          </div>

          <div class="actions">
            <a class="work" routerLink="/" fragment="projects">
              <span>My work</span>
              <app-icon name="chevrons-down" [size]="16" />
            </a>
            <div class="right">
              <app-theme-toggle />
              <a appButton size="lg" [full]="true" [href]="profile.resumeUrl" target="_blank" rel="noopener noreferrer">
                Resume <app-icon name="file-user" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero-card.css',
})
export class HeroCard {
  protected readonly profile = PROFILE;
  protected readonly logos = HERO_LOGOS;
  protected readonly skillsLoop = [...PROFILE.skills, ...PROFILE.skills];
}
