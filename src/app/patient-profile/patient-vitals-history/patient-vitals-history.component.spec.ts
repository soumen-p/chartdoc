import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVitalsHistoryComponent } from './patient-vitals-history.component';

describe('PatientVitalsHistoryComponent', () => {
  let component: PatientVitalsHistoryComponent;
  let fixture: ComponentFixture<PatientVitalsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientVitalsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVitalsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
