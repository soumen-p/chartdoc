import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSocialFamilyComponent } from './patient-social-family.component';

describe('PatientSocialFamilyComponent', () => {
  let component: PatientSocialFamilyComponent;
  let fixture: ComponentFixture<PatientSocialFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSocialFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSocialFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
