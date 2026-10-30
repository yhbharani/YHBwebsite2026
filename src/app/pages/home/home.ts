import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Contact } from './contact';
import { FeaturedProjects } from './featured-projects';
import { HeroCard } from './hero-card';
import { Timeline } from './timeline';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroCard, FeaturedProjects, Timeline, Contact],
  template: `
    <app-hero-card />
    <app-featured-projects />
    <app-timeline />
    <app-contact />
  `,
})
export default class Home {}
