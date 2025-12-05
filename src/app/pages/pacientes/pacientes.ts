import { Component } from '@angular/core';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PacienteForm } from '../paciente-form/paciente-form';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';


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
    PacienteForm,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterModule,
    TooltipModule,
    BreadcrumbModule
  ],
  providers: [ConfirmationService, MessageService
  ]
})
export class Pacientes {
  pacientes: Paciente[] = [];
  loading = false;

  showModal = false;
  pacienteSeleccionado: Paciente | null = null;

  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;

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
      next: (data: any) => {
        this.pacientes = data.result;
        this.loading = false;
      },
      error: () => this.loading = false
    });

    this.home = { icon: 'pi pi-users', label: 'Pacientes', routerLink: '/pacientes' };
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
      header: 'Confirmar Activación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.pacienteService.activate(p.idPaciente).subscribe(() => {
          this.msg.add({severity:'success', summary:'Activado', detail: 'Se ha activado el paciente correctamente'});
          this.cargarPacientes();
        });
      }
    });
  }

  desactivar(p: Paciente) {
    this.confirm.confirm({
      message: `¿Deseas desactivar al paciente ${p.nombre}?`,
      header: 'Confirmar Desactivación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.pacienteService.deactivate(p.idPaciente).subscribe(() => {
          this.msg.add({severity:'info', summary:'Desactivado', detail: 'Se ha desactivado el paciente correctamente'});
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
