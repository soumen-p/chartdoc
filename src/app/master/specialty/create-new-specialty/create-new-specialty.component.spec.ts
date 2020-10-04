import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSpecialtyComponent } from './create-new-specialty.component';

describe('CreateNewServiceComponent', () => {
  let component: CreateNewSpecialtyComponent;
  let fixture: ComponentFixture<CreateNewSpecialtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSpecialtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
