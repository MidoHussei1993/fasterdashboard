import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderDetailsComponent } from './transport-order-details.component';

describe('TransportOrderDetailsComponent', () => {
  let component: TransportOrderDetailsComponent;
  let fixture: ComponentFixture<TransportOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
