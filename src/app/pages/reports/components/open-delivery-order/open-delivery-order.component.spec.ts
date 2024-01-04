import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDeliveryOrderComponent } from './open-delivery-order.component';

describe('OpenDeliveryOrderComponent', () => {
  let component: OpenDeliveryOrderComponent;
  let fixture: ComponentFixture<OpenDeliveryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenDeliveryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDeliveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
