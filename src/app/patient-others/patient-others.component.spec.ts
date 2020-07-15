import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOthersComponent } from './patient-others.component';

describe('PatientOthersComponent', () => {
  let component: PatientOthersComponent;
  let fixture: ComponentFixture<PatientOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
