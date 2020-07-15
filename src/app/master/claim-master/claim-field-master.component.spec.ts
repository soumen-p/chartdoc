import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFieldMasterComponent } from './claim-field-master.component';

describe('ClaimFieldMasterComponent', () => {
  let component: ClaimFieldMasterComponent;
  let fixture: ComponentFixture<ClaimFieldMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFieldMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFieldMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
