import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLastLoginComponent } from './customer-last-login.component';

describe('CustomerLastLoginComponent', () => {
  let component: CustomerLastLoginComponent;
  let fixture: ComponentFixture<CustomerLastLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLastLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLastLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
