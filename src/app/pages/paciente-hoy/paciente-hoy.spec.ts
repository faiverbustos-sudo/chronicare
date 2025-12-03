import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteHoy } from './paciente-hoy';

describe('PacienteHoy', () => {
  let component: PacienteHoy;
  let fixture: ComponentFixture<PacienteHoy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteHoy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteHoy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
