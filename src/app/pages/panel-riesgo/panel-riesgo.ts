import { Component } from '@angular/core';
import { PacienteRiesgoDTO } from '../../models/paciente-riesgo';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-panel-riesgo',
  imports: [
    CommonModule, 
    TableModule, 
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './panel-riesgo.html',
  styleUrl: './panel-riesgo.css',
})
export class PanelRiesgo {
  pacientes: PacienteRiesgoDTO[] = [];
    loading = true;
    
    constructor(private pacienteService: PacienteService) {}
  
    ngOnInit() {
      this.pacienteService.getPacientesRiesgo().subscribe({
        next: (data: any) => {
          this.pacientes = data;
          console.log('Pacientes:', data);
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error al obtener pacientes:', err);
        }
      });
    }
  
    getColor(riesgo: string) {
      return {
        rojo: '#ff4d4f',
        amarillo: '#faad14',
        verde: '#52c41a'
      }[riesgo] || '#d9d9d9';
    }
}
