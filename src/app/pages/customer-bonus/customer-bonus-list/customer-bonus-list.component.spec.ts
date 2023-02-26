import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBonusListComponent } from './customer-bonus-list.component';

describe('CustomerBonusListComponent', () => {
  let component: CustomerBonusListComponent;
  let fixture: ComponentFixture<CustomerBonusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBonusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
