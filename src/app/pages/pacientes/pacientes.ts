import { Component } from '@angular/core';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PacienteForm } from '../paciente-form/paciente-form';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,    
    PacienteForm 
  ]
})
export class Pacientes {
  pacientes: Paciente[] = [];
  loading = false;

  showModal = false;
  pacienteSeleccionado: Paciente | null = null;

  constructor(
    private pacienteService: PacienteService,
    private confirm: ConfirmationService,
    private msg: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.loading = true;
    this.pacienteService.getAll().subscribe({
      next: (data: Paciente[]) => {
        this.pacientes = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  nuevoPaciente() {
    this.pacienteSeleccionado = null;
    this.showModal = true;
  }

  editarPaciente(p: Paciente) {
    this.pacienteSeleccionado = p;
    this.showModal = true;
  }

  activar(p: Paciente) {
    this.confirm.confirm({
      message: `¿Deseas activar al paciente ${p.nombre}?`,
      accept: () => {
        this.pacienteService.activate(p.idPaciente).subscribe(() => {
          this.msg.add({severity:'success', summary:'Activado'});
          this.cargarPacientes();
        });
      }
    });
  }

  desactivar(p: Paciente) {
    this.confirm.confirm({
      message: `¿Deseas desactivar al paciente ${p.nombre}?`,
      accept: () => {
        this.pacienteService.deactivate(p.idPaciente).subscribe(() => {
          this.msg.add({severity:'info', summary:'Desactivado'});
          this.cargarPacientes();
        });
      }
    });
  }

  onModalClose() {
    this.showModal = false;
    this.cargarPacientes();
  }
}
