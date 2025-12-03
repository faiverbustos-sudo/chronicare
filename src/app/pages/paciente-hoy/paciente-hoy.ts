import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdherenciaMedicamentoHoyDto, Paciente, PacienteHoyDto, PacienteService } from '../../services/paciente.service';
import { AdherenciaMedicamentoService } from '../../services/adherencia-medicamento.service';
import { MessageService } from 'primeng/api';
import { RegistroService } from '../../services/registro.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-paciente-hoy',
  imports: [
    CardModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    InputGroupModule,
    InputNumberModule,
    InputMaskModule,
    RouterModule,
    CommonModule,
    ToastModule
  ],
  templateUrl: './paciente-hoy.html',
  styleUrl: './paciente-hoy.css',
})
export class PacienteHoy {
  presion = '140/90';
  glucosa = 142;

  pacienteHoyData: PacienteHoyDto | undefined;

  constructor(
    private _pacienteService: PacienteService, 
    private _adherenciaMedicamentoService: AdherenciaMedicamentoService,
    private msg: MessageService,
    private _registroService: RegistroService) {}

  ngOnInit() {
    this.getPacienteHoy();
  }

  getPacienteHoy() {
    this._pacienteService.getPacienteHoy().subscribe(data => {
      this.pacienteHoyData = data.result;
      if(this.pacienteHoyData) {
        this.presion = this.pacienteHoyData.presion;
        this.glucosa = this.pacienteHoyData.valorNumerico;
      }
    });
  }

  registrarPresion() {
    if(this.presion && this.pacienteHoyData) {
      const valores = this.presion.split('/');
      const sistolica = Number(valores[0]);
      const diastolica = Number(valores[1]);

      this._registroService.create({
        idPaciente: this.pacienteHoyData!.idPaciente,
        tipoRegistro: 'presion',
        valorSistolica: sistolica,
        valorDiastolica: diastolica,
        unidad: 'mmHg'
      }).subscribe(() => {
        this.msg.add({severity:'success', summary:'Éxito', detail:'Presión arterial registrada'});
        this.getPacienteHoy();
      });
    }
  }

  registrarGlucosa() {
    if(this.glucosa && this.pacienteHoyData) {
      this._registroService.create({
        idPaciente: this.pacienteHoyData!.idPaciente,
        tipoRegistro: 'glucosa',
        valorNumerico: this.glucosa,
        unidad: 'mg/dL'
      }).subscribe(() => {
        this.msg.add({severity:'success', summary:'Éxito', detail:'Glucosa registrada'});
        this.getPacienteHoy();
      });
    }
  }

  registrarAdherencia(adherencia: AdherenciaMedicamentoHoyDto) {
    const tieneGuid = !!adherencia.idAdherencia && adherencia.idAdherencia !== '00000000-0000-0000-0000-000000000000';

    if(tieneGuid) {
      this._adherenciaMedicamentoService.update({
        idAdherencia: adherencia.idAdherencia,
        idMedicamento: adherencia.idMedicamento,
        idPaciente: adherencia.idPaciente,
        tomado: adherencia.tomado
      }).subscribe(() => {
        this.msg.add({severity:'success', summary:'Éxito', detail:'Adherencia actualizada'});
        this.getPacienteHoy();
        console.log('Adherencia actualizada');
      });
    }
    else {
      this._adherenciaMedicamentoService.create({
        idMedicamento: adherencia.idMedicamento,
        idPaciente: adherencia.idPaciente,
        tomado: adherencia.tomado
      }).subscribe(() => {
        this.msg.add({severity:'success', summary:'Éxito', detail:'Adherencia creada'});
        this.getPacienteHoy();
        console.log('Adherencia creada');
      });
    }
  }
}
