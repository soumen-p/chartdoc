import { TestBed } from '@angular/core/testing';

import { DoctorCalendarService } from './doctor-calendar.service';

describe('DoctorCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorCalendarService = TestBed.get(DoctorCalendarService);
    expect(service).toBeTruthy();
  });
});
