import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../core/theme.service';

/** "Light ( o) Dark" switch from the hero card. */
@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="lbl lbl--light" aria-hidden="true">Light</span>
    <button
      type="button"
      role="switch"
      class="track"
      [attr.aria-checked]="isDark()"
      aria-label="Dark mode"
      (click)="theme.toggle()"
    >
      <span class="knob"></span>
    </button>
    <span class="lbl lbl--dark" aria-hidden="true">Dark</span>
  `,
  styles: `
    :host { display: flex; align-items: center; gap: 12px; font-size: 16px; }
    .lbl { transition: color var(--dur); }
    .lbl--light { color: var(--pf-light-label); }
    .lbl--dark { color: var(--pf-dark-label); }
    .track {
      position: relative; width: 44px; height: 24px; border: none; padding: 0;
      border-radius: 999px; background: var(--pf-track); cursor: pointer; transition: background var(--dur);
    }
    .knob {
      position: absolute; top: 3px; left: var(--pf-knob); width: 18px; height: 18px; border-radius: 50%;
      background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); transition: left var(--dur) var(--ease-out);
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly isDark = computed(() => this.theme.theme() === 'dark');
}
