import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Contact } from './contact';
import { FeaturedProjects } from './featured-projects';
import { HeroCard } from './hero-card';
import { SectionNav } from './section-nav';
import { Timeline } from './timeline';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionNav, HeroCard, FeaturedProjects, Timeline, Contact],
  template: `
    <app-section-nav />
    <app-hero-card />
    <app-featured-projects />
    <app-timeline />
    <app-contact />
  `,
})
export default class Home {}
