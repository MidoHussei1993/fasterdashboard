import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasterWalletListComponent } from './faster-wallet-list.component';

describe('FasterWalletListComponent', () => {
  let component: FasterWalletListComponent;
  let fixture: ComponentFixture<FasterWalletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FasterWalletListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FasterWalletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
