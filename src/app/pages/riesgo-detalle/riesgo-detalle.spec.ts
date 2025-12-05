import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoDetalle } from './riesgo-detalle';

describe('RiesgoDetalle', () => {
  let component: RiesgoDetalle;
  let fixture: ComponentFixture<RiesgoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiesgoDetalle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiesgoDetalle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
