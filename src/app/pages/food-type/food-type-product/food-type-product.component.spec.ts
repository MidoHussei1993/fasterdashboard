import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeProductComponent } from './food-type-product.component';

describe('FoodTypeProductComponent', () => {
  let component: FoodTypeProductComponent;
  let fixture: ComponentFixture<FoodTypeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTypeProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
