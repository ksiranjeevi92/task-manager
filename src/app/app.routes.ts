import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then(
            (c) => c.HomePageComponent
          ),
      },
    ],
  },
];
