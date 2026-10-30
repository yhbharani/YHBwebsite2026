import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROFILE, SOCIALS } from '../../data/site';
import { Button } from '../../shared/button';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Icon],
  template: `
    <section id="contact" class="section" aria-labelledby="contact-title">
      <h2 id="contact-title" class="pf-section-title">Contact</h2>

      <div class="intro">
        <img [src]="profile.avatar" alt="" width="76" height="76" class="avatar" loading="lazy" />
        <p class="headline">{{ profile.contactHeadline }}</p>
        <p class="sub">{{ profile.contactSub }}</p>
      </div>

      <div class="panel">
        <div class="email-row">
          <div class="email-block">
            <span class="eyebrow">Email</span>
            <a class="email" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
          </div>
          <div class="email-actions">
            <button type="button" class="copy" (click)="copy()">
              {{ copied() ? 'Copied' : 'Copy email' }}
            </button>
            <a appButton [href]="'mailto:' + profile.email">Say hello <app-icon name="arrow-right" /></a>
          </div>
        </div>

        <div class="links">
          @for (l of links; track l.label) {
            <a class="link" [href]="l.href" target="_blank" rel="noopener noreferrer">
              <span class="link-text">
                <span class="link-label">{{ l.label }}</span>
                <span class="link-sub">{{ l.sub }}</span>
              </span>
              <app-icon name="arrow-up-right" />
            </a>
          }
        </div>
      </div>
      <span class="visually-hidden" aria-live="polite">{{ copied() ? 'Email copied to clipboard' : '' }}</span>
    </section>
  `,
  styles: `
    :host { display: block; }
    .section {
      padding: 0 20px clamp(72px, 9vw, 120px); display: flex; flex-direction: column; align-items: center;
      gap: clamp(40px, 5vw, 64px); scroll-margin-top: 24px;
    }
    .intro { display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; }
    .avatar { width: 76px; height: 76px; border-radius: 50%; object-fit: cover; }
    .headline {
      max-width: 560px; font-family: var(--font-head); font-weight: 600; font-size: clamp(24px, 3.2vw, 32px);
      line-height: 1.3; color: var(--pf-ink); text-wrap: balance;
    }
    .sub { font-size: clamp(15px, 1.6vw, 17px); color: var(--pf-muted); }

    .panel {
      width: 100%; max-width: 880px; background: var(--pf-panel); border: 1px solid var(--pf-fold); border-radius: 28px;
      padding: clamp(20px, 3vw, 32px); display: flex; flex-direction: column; gap: clamp(20px, 3vw, 28px);
    }
    .email-row {
      display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;
      background: var(--pf-card); border-radius: 20px; padding: clamp(16px, 2.4vw, 24px) clamp(18px, 2.6vw, 28px);
    }
    .email-block { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
    .eyebrow { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--pf-muted-2); }
    .email {
      font-family: var(--font-head); font-weight: 600; font-size: clamp(20px, 2.6vw, 28px); line-height: 1.1;
      color: var(--pf-ink); text-decoration: none; overflow-wrap: anywhere;
    }
    .email:hover { color: var(--pf-ink); text-decoration: underline; }
    .email-actions { display: flex; gap: 10px; flex-wrap: wrap; }
    .copy {
      display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 18px; border-radius: 999px;
      border: 1px solid var(--pf-fold); background: transparent; color: var(--pf-ink); font-family: inherit;
      font-size: 14px; font-weight: 500; line-height: 1; white-space: nowrap; cursor: pointer; transition: background var(--dur);
    }
    .copy:hover { background: var(--pf-chip); }

    .links { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 12px; }
    .link {
      display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px;
      border-radius: 18px; background: var(--pf-card); color: var(--pf-ink); text-decoration: none;
      transition: transform var(--dur) var(--ease-out);
    }
    .link:hover { color: var(--pf-ink); transform: translateY(-2px); }
    .link-text { display: flex; flex-direction: column; gap: 4px; }
    .link-label { font-family: var(--font-head); font-weight: 700; font-size: 18px; line-height: 1; }
    .link-sub { font-size: 12px; color: var(--pf-muted-2); }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly links = [...SOCIALS, { label: 'Resume', sub: 'PDF', href: PROFILE.resumeUrl }];
  protected readonly copied = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  copy(): void {
    navigator.clipboard?.writeText(this.profile.email).catch(() => {});
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 1600);
  }
}
