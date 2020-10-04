import { TestBed } from '@angular/core/testing';

import { SpecialtyMasterService } from './specialty-master.service';

describe('ServiceMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialtyMasterService = TestBed.get(SpecialtyMasterService);
    expect(service).toBeTruthy();
  });
});
