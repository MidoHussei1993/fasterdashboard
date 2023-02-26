import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOrderCrudComponent } from './transport-order-crud.component';

describe('TransportOrderCrudComponent', () => {
  let component: TransportOrderCrudComponent;
  let fixture: ComponentFixture<TransportOrderCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportOrderCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOrderCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
