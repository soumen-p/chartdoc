import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFlowSheetComponent } from './patient-flow-sheet.component';

describe('PatientFlowSheetComponent', () => {
  let component: PatientFlowSheetComponent;
  let fixture: ComponentFixture<PatientFlowSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFlowSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFlowSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
