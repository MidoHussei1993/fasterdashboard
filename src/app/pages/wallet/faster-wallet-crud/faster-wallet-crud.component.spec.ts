import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasterWalletCrudComponent } from './faster-wallet-crud.component';

describe('FasterWalletCrudComponent', () => {
  let component: FasterWalletCrudComponent;
  let fixture: ComponentFixture<FasterWalletCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FasterWalletCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FasterWalletCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
