import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCrudComponent } from './shop-crud.component';

describe('ShopCrudComponent', () => {
  let component: ShopCrudComponent;
  let fixture: ComponentFixture<ShopCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
