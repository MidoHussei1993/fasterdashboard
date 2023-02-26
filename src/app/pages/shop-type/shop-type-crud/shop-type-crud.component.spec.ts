import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTypeCrudComponent } from './shop-type-crud.component';

describe('ShopTypeCrudComponent', () => {
  let component: ShopTypeCrudComponent;
  let fixture: ComponentFixture<ShopTypeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopTypeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
