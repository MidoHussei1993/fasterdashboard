import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTrackingComponent } from './provider-tracking.component';

describe('ProviderTrackingComponent', () => {
  let component: ProviderTrackingComponent;
  let fixture: ComponentFixture<ProviderTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
