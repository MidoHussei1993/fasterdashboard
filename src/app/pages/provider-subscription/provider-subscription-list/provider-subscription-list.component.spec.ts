import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSubscriptionListComponent } from './provider-subscription-list.component';

describe('ProviderSubscriptionListComponent', () => {
  let component: ProviderSubscriptionListComponent;
  let fixture: ComponentFixture<ProviderSubscriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderSubscriptionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
