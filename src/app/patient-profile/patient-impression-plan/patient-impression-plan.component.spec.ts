import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientImpressionPlanComponent } from './patient-impression-plan.component';

describe('PatientImpressionPlanComponent', () => {
  let component: PatientImpressionPlanComponent;
  let fixture: ComponentFixture<PatientImpressionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientImpressionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientImpressionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
