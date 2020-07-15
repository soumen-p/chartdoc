import { TestBed } from '@angular/core/testing';

import { OthersServiceService } from './others-service.service';

describe('OthersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OthersServiceService = TestBed.get(OthersServiceService);
    expect(service).toBeTruthy();
  });
});
