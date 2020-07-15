import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProcedureUploadComponent } from './patient-procedure-upload.component';

describe('PatientProcedureUploadComponent', () => {
  let component: PatientProcedureUploadComponent;
  let fixture: ComponentFixture<PatientProcedureUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProcedureUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProcedureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
