import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFollowUpComponent } from './patient-follow-up.component';

describe('PatientFollowUpComponent', () => {
  let component: PatientFollowUpComponent;
  let fixture: ComponentFixture<PatientFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
