import { Route } from '@angular/router';
import { AppLinks } from '../models';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: `/${AppLinks.VIEWER}`,
    pathMatch: 'full',
  },
  {
    path: AppLinks.VIEWER,
    loadComponent: () =>
      import('../viewer/viewer.component').then((m) => m.ViewerComponent),
  },
  {
    path: AppLinks.TAYLOR_SERIES,
    loadComponent: () =>
      import('../taylor-series/taylor-series.component').then(
        (m) => m.TaylorSeriesComponent
      ),
  },
];
