import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE } from '../data/site';

// TODO: set to the custom domain once it's connected in Firebase Hosting.
export const SITE_URL = 'https://yashbharani.com';

export interface PageSeo {
  title?: string;
  description: string;
  path: string;
  image?: string;
}

/** Per-page <title>, description, canonical and social-preview tags (baked in at prerender). */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(page: PageSeo): void {
    const fullTitle = page.title ? `${page.title} · ${PROFILE.name}` : `${PROFILE.name} · ${PROFILE.role}`;
    const url = SITE_URL + page.path;
    const image = SITE_URL + (page.image ?? PROFILE.avatar);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}
