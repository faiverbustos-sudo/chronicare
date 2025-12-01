import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Paciente, PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.html',
  styleUrl: './paciente-form.css',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputText
  ]
})
export class PacienteForm {
  @Input() visible = false;
  @Input() paciente: Paciente | null = null;

  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private msg: MessageService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipoDocumento: [''],
      documento: [''],
      telefono: [''],
      email: ['', Validators.email],
      direccion: [''],
      eps: ['']
    });
  }

  ngOnChanges() {
    if (this.paciente) {
      this.form.patchValue(this.paciente);
    } else {
      this.form.reset();
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const data = this.form.value;
    data.idPaciente = this.paciente ? this.paciente.idPaciente : '';

    if (!this.paciente) {
      // Crear
      this.pacienteService.create(data).subscribe(() => {
        this.msg.add({severity:'success', summary:'Paciente creado'});
        this.close.emit();
      });
    } else {
      // Editar
      this.pacienteService.update(data)
        .subscribe(() => {
          this.msg.add({severity:'success', summary:'Paciente actualizado'});
          this.close.emit();
        });
    }
  }

  cerrar() {
    this.close.emit();
  }
}
