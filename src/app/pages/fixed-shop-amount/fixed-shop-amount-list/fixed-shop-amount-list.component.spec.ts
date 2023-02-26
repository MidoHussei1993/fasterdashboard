import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedShopAmountListComponent } from './fixed-shop-amount-list.component';

describe('FixedShopAmountListComponent', () => {
  let component: FixedShopAmountListComponent;
  let fixture: ComponentFixture<FixedShopAmountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedShopAmountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedShopAmountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
