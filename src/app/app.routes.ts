import { Routes } from '@angular/router';
import { Pacientes } from './pages/pacientes/pacientes';
import { App } from './app';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { PanelRiesgo } from './pages/panel-riesgo/panel-riesgo';
import { PacienteDashboard } from './pages/paciente-dashboard/paciente-dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: '',
        component: App,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'pacientes', component: Pacientes },
            { path: 'panel-riesgo', component: PanelRiesgo },
            { path: 'paciente-dashboard', component: PacienteDashboard }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
