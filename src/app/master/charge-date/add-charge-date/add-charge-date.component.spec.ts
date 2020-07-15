import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargeDateComponent } from './add-charge-date.component';

describe('AddChargeDateComponent', () => {
  let component: AddChargeDateComponent;
  let fixture: ComponentFixture<AddChargeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChargeDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChargeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
