import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderComponent } from './transport-order.component';

describe('TransportOrderComponent', () => {
  let component: TransportOrderComponent;
  let fixture: ComponentFixture<TransportOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
