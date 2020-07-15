import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCalenderComponent } from './doctor-calender.component';

describe('DoctorCalenderComponent', () => {
  let component: DoctorCalenderComponent;
  let fixture: ComponentFixture<DoctorCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
