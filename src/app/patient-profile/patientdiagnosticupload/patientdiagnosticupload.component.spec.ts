import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientdiagnosticuploadComponent } from './patientdiagnosticupload.component';

describe('PatientdiagnosticuploadComponent', () => {
  let component: PatientdiagnosticuploadComponent;
  let fixture: ComponentFixture<PatientdiagnosticuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientdiagnosticuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientdiagnosticuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
