import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeDateComponent } from './charge-date.component';

describe('ChargeDateComponent', () => {
  let component: ChargeDateComponent;
  let fixture: ComponentFixture<ChargeDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
