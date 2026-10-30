import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'pf-theme';

/** Light / dark theme. The choice is saved per visitor and applied as data-theme on <html>. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.readInitial());

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    const root = this.doc.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* storage unavailable: theme still works for this visit */
      }
    }
  }

  private readInitial(): Theme {
    // index.html sets data-theme before Angular boots; mirror it here.
    return this.doc.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
}
