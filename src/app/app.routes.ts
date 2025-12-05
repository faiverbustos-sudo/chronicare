import { Routes } from '@angular/router';
import { Pacientes } from './pages/pacientes/pacientes';
import { App } from './app';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { PanelRiesgo } from './pages/panel-riesgo/panel-riesgo';
import { PacienteDashboard } from './pages/paciente-dashboard/paciente-dashboard';
import { PacienteHoy } from './pages/paciente-hoy/paciente-hoy';
import { Medicamentos } from './pages/medicamentos/medicamentos';
import { Reportes } from './pages/reportes/reportes';
import { Configuracion } from './pages/configuracion/configuracion';
import { Medicos } from './pages/medicos/medicos';
import { RiesgoDetalle } from './pages/riesgo-detalle/riesgo-detalle';

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
            { path: 'paciente-dashboard', component: PacienteDashboard },
            { path: 'paciente-hoy', component: PacienteHoy },
            { path: 'medicamentos/:idPaciente', component: Medicamentos },
            { path: 'reportes', component: Reportes },
            { path: 'configuracion', component: Configuracion },
            { path: 'medicos', component: Medicos },
            { path: 'riesgo-detalle/:idPaciente', component: RiesgoDetalle }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
