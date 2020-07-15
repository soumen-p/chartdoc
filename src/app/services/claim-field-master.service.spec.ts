import { TestBed } from '@angular/core/testing';

import { ClaimFieldMasterService } from './claim-field-master.service';

describe('ClaimFieldMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClaimFieldMasterService = TestBed.get(ClaimFieldMasterService);
    expect(service).toBeTruthy();
  });
});
