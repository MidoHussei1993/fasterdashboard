import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTypeListComponent } from './shop-type-list.component';

describe('ShopTypeListComponent', () => {
  let component: ShopTypeListComponent;
  let fixture: ComponentFixture<ShopTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
