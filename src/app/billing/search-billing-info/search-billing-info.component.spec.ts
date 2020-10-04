import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBillingInfoComponent } from './search-billing-info.component';

describe('SearchBillingInfoComponent', () => {
  let component: SearchBillingInfoComponent;
  let fixture: ComponentFixture<SearchBillingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBillingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
