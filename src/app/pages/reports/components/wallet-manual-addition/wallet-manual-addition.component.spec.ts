import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletManualAdditionComponent } from './wallet-manual-addition.component';

describe('WalletManualAdditionComponent', () => {
  let component: WalletManualAdditionComponent;
  let fixture: ComponentFixture<WalletManualAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletManualAdditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletManualAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
