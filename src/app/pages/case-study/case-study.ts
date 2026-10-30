import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { PROJECTS, findProject } from '../../data/site';
import { Button } from '../../shared/button';
import { Icon } from '../../shared/icon';

/** Reusable case-study page: /work/:slug. Content comes from PROJECTS in data/site.ts. */
@Component({
  selector: 'app-case-study',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Icon],
  templateUrl: './case-study.html',
  styleUrl: './case-study.css',
})
export default class CaseStudy {
  /** Bound from the :slug route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  private readonly seo = inject(SeoService);

  protected readonly project = computed(() => findProject(this.slug())!);
  protected readonly next = computed(() => {
    const list = PROJECTS;
    const i = list.findIndex((p) => p.slug === this.slug());
    return list[(i + 1) % list.length];
  });

  constructor() {
    effect(() => {
      const p = this.project();
      this.seo.set({ title: p.title, description: p.summary, path: `/work/${p.slug}`, image: p.cover ?? undefined });
    });
  }
}
