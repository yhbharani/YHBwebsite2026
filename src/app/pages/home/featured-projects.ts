import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/site';
import { Button } from '../../shared/button';
import { Icon } from '../../shared/icon';

const HEADER_H = 172; // sticky "Featured Projects" header height
const FIRST_TOP = 188; // where the first folder tab sticks, below the header
const STEP = 74; // how much of each earlier folder stays visible

/**
 * Stacked folder cards: as you scroll, each project folder slides up
 * and sticks on top of the previous one, leaving its tab visible.
 */
@Component({
  selector: 'app-featured-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Icon],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.css',
})
export class FeaturedProjects {
  private readonly destroyRef = inject(DestroyRef);
  private readonly col = viewChild.required<ElementRef<HTMLElement>>('col');

  protected readonly projects = PROJECTS.filter((p) => p.featured);

  // Viewport + last-card measurements (sensible defaults for the prerendered HTML).
  private readonly vh = signal(900);
  private readonly vw = signal(1200);
  private readonly cardH = signal(0);

  protected readonly mobile = computed(() => this.vw() < 640);

  private readonly stackOff = computed(() => {
    const n = this.projects.length;
    const stackH = FIRST_TOP + (n - 1) * STEP + (this.cardH() || 380);
    return Math.max(0, Math.round((this.vh() - stackH) / 2));
  });

  protected readonly headerTop = computed(() => this.stackOff());
  protected readonly headerMb = computed(() => {
    const n = this.projects.length;
    return this.cardH() ? this.cardH() + FIRST_TOP + (n - 1) * STEP - HEADER_H : 16;
  });

  protected readonly cards = computed(() => {
    const n = this.projects.length;
    const off = this.stackOff();
    const hdrMb = this.headerMb();
    return this.projects.map((p, i) => ({
      ...p,
      num: String(i + 1).padStart(2, '0'),
      stickyTop: off + FIRST_TOP + i * STEP,
      marginTop: i === 0 ? 16 - hdrMb : 40 - (n - i) * STEP,
      marginBottom: (n - 1 - i) * STEP,
    }));
  });

  protected readonly slantStroke = computed(() =>
    this.mobile()
      ? 'M0 0.5 C10 0.5 14 3 19 9 L37 35 C40 39 44 41 63.5 43.5 L63.5 45'
      : 'M0 0.5 C10 0.5 14 3 19 9 L37 35 C42 41.5 46 43.5 56 43.5',
  );

  constructor() {
    afterNextRender(() => {
      const col = this.col().nativeElement;
      const measure = () => {
        const cards = col.querySelectorAll<HTMLElement>('.folder');
        const last = cards[cards.length - 1];
        if (last) {
          const h = Math.round(last.getBoundingClientRect().height);
          if (h && h !== this.cardH()) this.cardH.set(h);
        }
        this.vh.set(window.innerHeight);
        this.vw.set(window.innerWidth);
      };
      const ro = new ResizeObserver(measure);
      Array.from(col.children).forEach((el) => ro.observe(el));
      window.addEventListener('resize', measure);
      measure();
      this.destroyRef.onDestroy(() => {
        ro.disconnect();
        window.removeEventListener('resize', measure);
      });
    });
  }
}
