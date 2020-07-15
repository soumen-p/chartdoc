import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientImmunizationsComponent } from './patient-immunizations.component';

describe('PatientImmunizationsComponent', () => {
  let component: PatientImmunizationsComponent;
  let fixture: ComponentFixture<PatientImmunizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientImmunizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientImmunizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
