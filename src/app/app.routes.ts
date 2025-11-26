import { Routes } from '@angular/router';
import { Pacientes } from './pages/pacientes/pacientes';
import { App } from './app';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: App,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'pacientes', component: Pacientes }
        ]
    }
];
