import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard-component/dashboard-component').then(m => m.DashboardComponent)
    },
    {
        path: 'reporting',
        loadComponent: () => import('./pages/reporting-component/reporting-component').then(m => m.ReportingComponent)
    },
    {
        path: 'quote',
        loadComponent: () => import('./pages/quote-component/quote-component').then(m => m.QuoteComponent)
    }
];
