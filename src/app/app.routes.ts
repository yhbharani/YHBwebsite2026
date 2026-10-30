import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { SeoService } from './core/seo.service';
import { PROFILE, findProject } from './data/site';

const projectExists: CanActivateFn = (route) =>
  findProject(route.paramMap.get('slug')) ? true : inject(Router).parseUrl('/404');

const homeSeo: CanActivateFn = () => {
  inject(SeoService).set({
    description: `${PROFILE.name}, ${PROFILE.role} in ${PROFILE.location}. I turn complex chores into effortless journeys and create systems that move metrics.`,
    path: '/',
  });
  return true;
};

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home'), canActivate: [homeSeo] },
  { path: 'about', loadComponent: () => import('./pages/about/about') },
  { path: 'work/:slug', loadComponent: () => import('./pages/case-study/case-study'), canActivate: [projectExists] },
  { path: '404', loadComponent: () => import('./pages/not-found') },
  { path: '**', loadComponent: () => import('./pages/not-found') },
];
