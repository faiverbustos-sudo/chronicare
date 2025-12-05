import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MedicamentoForm } from '../medicamento-form/medicamento-form';
import { Medicamento, MedicamentoService } from '../../services/medicamento.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Paciente } from '../../services/paciente.service';
import { TooltipModule } from "primeng/tooltip";
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-medicamentos',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    MedicamentoForm,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterModule,
    TooltipModule,
    BreadcrumbModule
],
  templateUrl: './medicamentos.html',
  styleUrl: './medicamentos.css',
})
export class Medicamentos {
  paciente: Paciente | null = null;
  medicamentos: Medicamento[] = [];
  loading = false;

  showModal = false;
  medicamentoSeleccionado: Medicamento | null = null;

  idPaciente: string = '';

  breadcrumbItems: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(
    private _medicamentoService: MedicamentoService,
    private _confirm: ConfirmationService,
    private _msg: MessageService,
    private _route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.idPaciente = params.get('idPaciente') || '';
      this.cargarMedicamentos();
    });

    this.breadcrumbItems = [
        { label: 'Medicamentos' }
    ];

    this.home = { icon: 'pi pi-users', label: 'Pacientes', routerLink: '/pacientes' };
  }

  cargarMedicamentos() {
    this.loading = true;
    this._medicamentoService.getAllByPaciente(this.idPaciente).subscribe({
      next: (data: any) => {
        this.medicamentos = data.result.medicamentos;
        this.paciente = data.result.paciente;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  nuevoMedicamento() {
    this.medicamentoSeleccionado = null;
    this.showModal = true;
  }

  editarMedicamento(m: Medicamento) {
    this.medicamentoSeleccionado = m;
    this.showModal = true;
  }

  activar(m: Medicamento) {
    this._confirm.confirm({
      message: `¿Deseas activar al medicamento ${m.nombre}?`,
      header: 'Confirmar Activación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this._medicamentoService.activate(m.idMedicamento).subscribe(() => {
          this._msg.add({severity:'success', summary:'Activado', detail: 'Se ha activado el medicamento correctamente'});
          this.cargarMedicamentos();
        });
      }
    });
  }
  
  desactivar(m: Medicamento) {
    this._confirm.confirm({
      message: `¿Deseas desactivar al medicamento ${m.nombre}?`,
      header: 'Confirmar Desactivación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this._medicamentoService.deactivate(m.idMedicamento).subscribe(() => {
          this._msg.add({severity:'info', summary:'Desactivado', detail: 'Se ha desactivado el medicamento correctamente'});
          this.cargarMedicamentos();
        });
      }
    });
  }
  
  onModalClose() {
    this.showModal = false;
    this.cargarMedicamentos();
  }
}
