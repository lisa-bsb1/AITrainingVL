import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full',
    title: 'Home'
  },
  {
    path: 'materials',
    loadComponent: () => import('./features/pages/materials/pages/materials.component').then(m => m.MaterialsComponent),
    title: 'Materials'
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/pages/courses/courses.component').then(m => m.CoursesComponent),
    title: 'Courses',
  },
  {
    path: 'community',
    loadComponent: () => import('./features/pages/community/community.component').then(m => m.CommunityComponent),
    title: 'Community'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  }
];
