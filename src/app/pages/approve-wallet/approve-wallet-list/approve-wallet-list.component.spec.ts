import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWalletListComponent } from './approve-wallet-list.component';

describe('ApproveWalletListComponent', () => {
  let component: ApproveWalletListComponent;
  let fixture: ComponentFixture<ApproveWalletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveWalletListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
