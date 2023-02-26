import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedShopAmountCrudComponent } from './fixed-shop-amount-crud.component';

describe('FixedShopAmountCrudComponent', () => {
  let component: FixedShopAmountCrudComponent;
  let fixture: ComponentFixture<FixedShopAmountCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedShopAmountCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedShopAmountCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
