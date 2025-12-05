import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Medicamento, MedicamentoService } from '../../services/medicamento.service';
import { MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-medicamento-form',
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule
  ],
  templateUrl: './medicamento-form.html',
  styleUrl: './medicamento-form.css',
})
export class MedicamentoForm {
  @Input() visible = false;
  @Input() medicamento: Medicamento | null = null;
  @Input() idPaciente: string | null = null;

  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _medicamentoService: MedicamentoService,
    private _msg: MessageService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      via: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.medicamento) {
      this.form.patchValue(this.medicamento);
      this.form.get('fechaInicio')?.setValue(new Date(this.medicamento.fechaInicio || ''));
      this.form.get('fechaFin')?.setValue(new Date(this.medicamento.fechaFin || ''));
    } else {
      this.form.reset();
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const data = this.form.value;
    data.idMedicamento = this.medicamento ? this.medicamento.idMedicamento : '';
    data.idPaciente = this.idPaciente ? this.idPaciente : '';

    if (!this.medicamento) {
      // Crear
      this._medicamentoService.create(data).subscribe(() => {
        this._msg.add({severity:'success', summary:'Medicamento creado'});
        this.close.emit();
      });
    } else {
      // Editar
      this._medicamentoService.update(data)
        .subscribe(() => {
          this._msg.add({severity:'success', summary:'Medicamento actualizado'});
          this.close.emit();
        });
    }
  }

  cerrar() {
    this.close.emit();
  }
}
