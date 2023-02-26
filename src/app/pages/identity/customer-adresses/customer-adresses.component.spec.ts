import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdressesComponent } from './customer-adresses.component';

describe('CustomerAdressesComponent', () => {
  let component: CustomerAdressesComponent;
  let fixture: ComponentFixture<CustomerAdressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAdressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
