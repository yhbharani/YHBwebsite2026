import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Design-system Button. Apply to an <a> (works with href or routerLink) or a <button>:
 *   <a appButton size="lg" [full]="true" href="...">Resume <app-icon name="file-user" /></a>
 */
@Component({
  selector: 'a[appButton], button[appButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'ds-btn',
    '[class.ds-btn--primary]': "variant() === 'primary'",
    '[class.ds-btn--secondary]': "variant() === 'secondary'",
    '[class.ds-btn--ghost]': "variant() === 'ghost'",
    '[class.ds-btn--sm]': "size() === 'sm'",
    '[class.ds-btn--md]': "size() === 'md'",
    '[class.ds-btn--lg]': "size() === 'lg'",
    '[class.ds-btn--full]': 'full()',
  },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-body);
      font-weight: 600;
      letter-spacing: 0.01em;
      line-height: 1;
      border-radius: var(--radius-pill);
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      transition:
        background var(--dur) var(--ease-out),
        color var(--dur) var(--ease-out),
        border-color var(--dur) var(--ease-out),
        transform var(--dur-fast) var(--ease-out),
        box-shadow var(--dur) var(--ease-out);
    }
    :host(:hover) { text-decoration: none; }
    :host(:active) { transform: translateY(1px); }

    :host(.ds-btn--sm) { padding: 9px 16px; font-size: 13px; gap: 8px; }
    :host(.ds-btn--md) { padding: 13px 26px; font-size: 15px; gap: 10px; }
    :host(.ds-btn--lg) { padding: 17px 36px; font-size: 16px; gap: 12px; }
    :host(.ds-btn--full) { display: flex; width: 100%; }

    :host(.ds-btn--primary) {
      background: var(--accent);
      color: var(--accent-ink);
      border-color: var(--accent);
      box-shadow: var(--shadow-sm);
    }
    :host(.ds-btn--primary:hover) {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
      color: var(--accent-ink);
    }
    :host(.ds-btn--secondary) {
      background: transparent;
      color: var(--text-heading);
      border-color: var(--line-strong);
    }
    :host(.ds-btn--secondary:hover) { border-color: var(--accent); color: var(--accent-hover); }
    :host(.ds-btn--ghost) { background: transparent; color: var(--accent-hover); }
    :host(.ds-btn--ghost:hover) { background: var(--accent-soft); }
  `,
})
export class Button {
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly full = input(false);
}
