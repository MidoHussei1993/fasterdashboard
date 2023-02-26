import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeShopCrudComponent } from './food-type-shop-crud.component';

describe('FoodTypeShopCrudComponent', () => {
  let component: FoodTypeShopCrudComponent;
  let fixture: ComponentFixture<FoodTypeShopCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTypeShopCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeShopCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
