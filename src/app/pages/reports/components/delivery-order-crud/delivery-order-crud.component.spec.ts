import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrderCrudComponent } from './delivery-order-crud.component';

describe('DeliveryOrderCrudComponent', () => {
  let component: DeliveryOrderCrudComponent;
  let fixture: ComponentFixture<DeliveryOrderCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOrderCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOrderCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
