import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderWalletListComponent } from './provider-wallet-list.component';

describe('ProviderWalletListComponent', () => {
  let component: ProviderWalletListComponent;
  let fixture: ComponentFixture<ProviderWalletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderWalletListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
