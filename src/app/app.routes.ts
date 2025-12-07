import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard-component').then(m => m.DashboardComponent)
    },
    {
        path: 'quote/create',
        loadComponent: () => import('./features/quote/quote-component').then(m => m.QuoteComponent),
    },
    {
        path: 'reporting',
        loadComponent: () => import('./features/reporting/reporting-component').then(m => m.ReportingComponent)
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./features/login/login-component').then(m => m.LoginComponent)
    },
    {
        path: 'account-profile',
        loadComponent: () => import('./features/account-profile/account-profile.component').then(m => m.AccountProfileComponent)
    }
];
