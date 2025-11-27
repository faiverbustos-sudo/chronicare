import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRiesgo } from './panel-riesgo';

describe('PanelRiesgo', () => {
  let component: PanelRiesgo;
  let fixture: ComponentFixture<PanelRiesgo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelRiesgo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelRiesgo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
