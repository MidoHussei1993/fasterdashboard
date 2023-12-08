import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeShopComponent } from './food-type-shop.component';

describe('FoodTypeShopComponent', () => {
  let component: FoodTypeShopComponent;
  let fixture: ComponentFixture<FoodTypeShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTypeShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
