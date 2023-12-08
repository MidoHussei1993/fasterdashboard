import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingProvidersComponent } from './tracking-providers.component';

describe('TrackingProvidersComponent', () => {
  let component: TrackingProvidersComponent;
  let fixture: ComponentFixture<TrackingProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
