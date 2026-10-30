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
  'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  // outline brand marks used on the contact cards
  linkedin: ['M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z', 'M2 9h4v12H2z', 'M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0'],
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2',
  ],
  behance: ['M2 6h5a3 3 0 0 1 0 6H2z', 'M2 12h6a3 3 0 0 1 0 6H2z', 'M14 14.5h8a4 4 0 1 0-1.2 3', 'M15 7h5'],
  'file-text': ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
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
