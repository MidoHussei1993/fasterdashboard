import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProfitComponent } from './shop-profit.component';

describe('ShopProfitComponent', () => {
  let component: ShopProfitComponent;
  let fixture: ComponentFixture<ShopProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopProfitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
