import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCptComponent } from './patient-cpt.component';

describe('PatientCptComponent', () => {
  let component: PatientCptComponent;
  let fixture: ComponentFixture<PatientCptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
