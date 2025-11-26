import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PacienteService } from '../../services/paciente.service';


@Component({
  selector: 'app-pacientes',
  imports: [TableModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
})
export class Pacientes {
  pacientes: any = [];
  
  constructor(private pacienteService: PacienteService) {}

  ngOnInit() {
    this.pacienteService.getAll().subscribe({
      next: (data: any) => {
        this.pacientes = data;
        console.log('Pacientes:', data);
      },
      error: (err: any) => {
        console.error('Error al obtener pacientes:', err);
      }
    });
  }
}
