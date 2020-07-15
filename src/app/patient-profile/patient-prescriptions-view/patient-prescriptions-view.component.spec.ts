import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrescriptionsViewComponent } from './patient-prescriptions-view.component';

describe('PatientPrescriptionsViewComponent', () => {
  let component: PatientPrescriptionsViewComponent;
  let fixture: ComponentFixture<PatientPrescriptionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPrescriptionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPrescriptionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
