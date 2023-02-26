import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderWalletCrudComponent } from './provider-wallet-crud.component';

describe('ProviderWalletCrudComponent', () => {
  let component: ProviderWalletCrudComponent;
  let fixture: ComponentFixture<ProviderWalletCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderWalletCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderWalletCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
