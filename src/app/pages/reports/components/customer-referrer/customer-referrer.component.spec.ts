import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReferrerComponent } from './customer-referrer.component';

describe('CustomerReferrerComponent', () => {
  let component: CustomerReferrerComponent;
  let fixture: ComponentFixture<CustomerReferrerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerReferrerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReferrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
