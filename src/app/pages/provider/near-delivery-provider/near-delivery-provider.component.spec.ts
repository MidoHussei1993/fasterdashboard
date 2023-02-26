import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearDeliveryProviderComponent } from './near-delivery-provider.component';

describe('NearDeliveryProviderComponent', () => {
  let component: NearDeliveryProviderComponent;
  let fixture: ComponentFixture<NearDeliveryProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearDeliveryProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearDeliveryProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
