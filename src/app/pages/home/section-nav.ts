import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
}

/**
 * Floating section nav on the left edge of the home page (wide screens only).
 * Highlights the section you're currently reading.
 */
@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Sections">
      @for (n of items; track n.id) {
        <a
          [href]="'#' + n.id"
          [class.on]="current() === n.id"
          [attr.aria-current]="current() === n.id ? 'true' : null"
          (click)="go($event, n.id)"
          >{{ n.label }}</a
        >
      }
    </nav>
  `,
  styles: `
    :host {
      position: fixed; left: clamp(16px, 2.4vw, 32px); top: 50%; transform: translateY(-50%); z-index: 50;
    }
    nav {
      display: flex; flex-direction: column; gap: 2px; padding: 4px; border-radius: 14px;
      background: var(--pf-card); border: 1px solid var(--pf-line); box-shadow: 0 8px 24px rgba(20, 16, 24, 0.06);
      transition: background var(--dur-slow) var(--ease-out), border-color var(--dur-slow) var(--ease-out);
    }
    a {
      display: flex; align-items: center; padding: 8px 10px; border-radius: 10px; text-decoration: none;
      font-family: var(--font-head); font-weight: 600; font-size: 14px; line-height: 1;
      color: var(--pf-muted-2); transition: background 200ms, color 200ms;
    }
    a:hover { color: var(--pf-ink); }
    a.on { color: var(--pf-ink); background: var(--pf-chip); }
    @media (max-width: 1100px) { :host { display: none; } }
  `,
})
export class SectionNav {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly items: NavItem[] = [
    { id: 'top', label: 'Home' },
    { id: 'projects', label: 'Work' },
    { id: 'timeline', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];
  protected readonly current = signal('top');

  constructor() {
    afterNextRender(() => {
      const win = this.doc.defaultView!;
      const onScroll = () => {
        let cur = 'top';
        for (const { id } of this.items) {
          const el = this.doc.getElementById(id);
          if (el && el.getBoundingClientRect().top < win.innerHeight * 0.4) cur = id;
        }
        if (win.innerHeight + win.scrollY >= this.doc.body.scrollHeight - 4) cur = 'contact';
        this.current.set(cur);
      };
      win.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      this.destroyRef.onDestroy(() => win.removeEventListener('scroll', onScroll));
    });
  }

  protected go(e: Event, id: string): void {
    e.preventDefault();
    const win = this.doc.defaultView!;
    const el = this.doc.getElementById(id);
    if (!el) return;
    const top = id === 'top' ? 0 : el.getBoundingClientRect().top + win.scrollY - 24;
    win.scrollTo({ top, behavior: 'smooth' });
  }
}
