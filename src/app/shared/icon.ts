import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Lucide-style stroke icons used in the design. */
const ICONS: Record<string, string[]> = {
  'file-user': [
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z',
    'M14 2v4a2 2 0 0 0 2 2h4',
    'M15 18a3 3 0 1 0-6 0',
    'M14 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  ],
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  'arrow-left': ['M19 12H5', 'm12 19-7-7 7-7'],
  'arrow-up-right': ['M7 17 17 7', 'M7 7h10v10'],
  'chevrons-down': ['m7 6 5 5 5-5', 'm7 13 5 5 5-5'],
  'chevron-left': ['m15 18-6-6 6-6'],
  'chevron-right': ['m9 18 6-6-6-6'],
  'map-pin': ['M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'],
};

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
      @if (name() === 'map-pin') {
        <circle cx="12" cy="10" r="3" />
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; flex: none; }
  `,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(18);
  protected readonly paths = computed(() => ICONS[this.name()] ?? []);
}
