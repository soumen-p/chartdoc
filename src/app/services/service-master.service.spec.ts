import { TestBed } from '@angular/core/testing';

import { ServiceMasterService } from './service-master.service';

describe('ServiceMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceMasterService = TestBed.get(ServiceMasterService);
    expect(service).toBeTruthy();
  });
});
