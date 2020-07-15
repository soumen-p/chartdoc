import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientIcdComponent } from './patient-icd.component';

describe('PatientIcdComponent', () => {
  let component: PatientIcdComponent;
  let fixture: ComponentFixture<PatientIcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientIcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientIcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
