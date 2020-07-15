import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProceduresComponent } from './patient-procedures.component';

describe('PatientProceduresComponent', () => {
  let component: PatientProceduresComponent;
  let fixture: ComponentFixture<PatientProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
