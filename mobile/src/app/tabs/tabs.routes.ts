import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'partidos', // Ruta para la pestaña 1
        loadComponent: () =>
          import('../partidos/partidos.page').then((m) => m.PartidosPage),
      },
      {
        path: 'reportar', // Ruta para la pestaña 2
        loadComponent: () =>
          import('../reportar/reportar.page').then((m) => m.ReportarPage),
      },
      {
        path: '',
        redirectTo: '/tabs/partidos', // Redirige por defecto a 'partidos'
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/partidos',
    pathMatch: 'full',
  },
];