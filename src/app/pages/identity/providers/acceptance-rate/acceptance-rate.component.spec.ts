import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceRateComponent } from './acceptance-rate.component';

describe('AcceptanceRateComponent', () => {
  let component: AcceptanceRateComponent;
  let fixture: ComponentFixture<AcceptanceRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptanceRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
