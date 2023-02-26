import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBonusCrudComponent } from './customer-bonus-crud.component';

describe('CustomerBonusCrudComponent', () => {
  let component: CustomerBonusCrudComponent;
  let fixture: ComponentFixture<CustomerBonusCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBonusCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBonusCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
