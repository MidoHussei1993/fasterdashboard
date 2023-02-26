import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedFromPaymentComponent } from './added-from-payment.component';

describe('AddedFromPaymentComponent', () => {
  let component: AddedFromPaymentComponent;
  let fixture: ComponentFixture<AddedFromPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedFromPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedFromPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
