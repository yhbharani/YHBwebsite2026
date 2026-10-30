import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** Year-by-year scrapbook: magnets, tools, and projects. */
@Component({
  selector: 'app-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline {
  protected readonly years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  protected readonly year = signal(0);

  prev(): void {
    this.year.update((y) => Math.max(0, y - 1));
  }
  next(): void {
    this.year.update((y) => Math.min(this.years.length - 1, y + 1));
  }
}
