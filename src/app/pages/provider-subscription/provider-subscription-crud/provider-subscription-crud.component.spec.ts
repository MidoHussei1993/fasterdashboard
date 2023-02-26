import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSubscriptionCrudComponent } from './provider-subscription-crud.component';

describe('ProviderSubscriptionCrudComponent', () => {
  let component: ProviderSubscriptionCrudComponent;
  let fixture: ComponentFixture<ProviderSubscriptionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderSubscriptionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSubscriptionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
