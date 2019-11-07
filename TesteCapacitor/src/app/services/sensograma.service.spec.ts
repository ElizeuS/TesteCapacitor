import { TestBed } from '@angular/core/testing';

import { SensogramaService } from './sensograma.service';

describe('SensogramaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensogramaService = TestBed.get(SensogramaService);
    expect(service).toBeTruthy();
  });
});
