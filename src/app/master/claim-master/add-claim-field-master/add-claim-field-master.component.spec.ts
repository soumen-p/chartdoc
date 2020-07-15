import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimFieldMasterComponent } from './add-claim-field-master.component';

describe('AddClaimFieldMasterComponent', () => {
  let component: AddClaimFieldMasterComponent;
  let fixture: ComponentFixture<AddClaimFieldMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClaimFieldMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClaimFieldMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
