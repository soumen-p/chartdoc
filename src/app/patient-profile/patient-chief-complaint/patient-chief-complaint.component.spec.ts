import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChiefComplaintComponent } from './patient-chief-complaint.component';

describe('PatientChiefComplaintComponent', () => {
  let component: PatientChiefComplaintComponent;
  let fixture: ComponentFixture<PatientChiefComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientChiefComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientChiefComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
