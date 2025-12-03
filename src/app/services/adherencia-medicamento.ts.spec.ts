import { TestBed } from '@angular/core/testing';

import { AdherenciaMedicamentoTs } from './adherencia-medicamento.ts';

describe('AdherenciaMedicamentoTs', () => {
  let service: AdherenciaMedicamentoTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherenciaMedicamentoTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
