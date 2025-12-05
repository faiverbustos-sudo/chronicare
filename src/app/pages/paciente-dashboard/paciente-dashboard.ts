import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../services/auth.service';
import { PacienteDashboardDto, PacienteService } from '../../services/paciente.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-dashboard',
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    DividerModule,
    ButtonModule,
    CheckboxModule,
    RouterModule
  ],
  templateUrl: './paciente-dashboard.html',
  styleUrl: './paciente-dashboard.css',
})
export class PacienteDashboard {

  dashboardData: PacienteDashboardDto | undefined;

  constructor(private auth: AuthService, private _pacienteService: PacienteService) {    
  }

  ngOnInit() {
    this.getDashboardData();
  }

  getDashboardData() {
    this._pacienteService.getPacienteDashboard().subscribe(data => {
      this.dashboardData = data.result;
    });
  }

  logout() {
    this.auth.logout();
  }
}
