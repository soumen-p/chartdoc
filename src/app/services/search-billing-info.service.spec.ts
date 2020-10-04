import { TestBed } from '@angular/core/testing';

import { SearchBillingInfoService } from './search-billing-info.service';

describe('SearchBillingInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchBillingInfoService = TestBed.get(SearchBillingInfoService);
    expect(service).toBeTruthy();
  });
});
