import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProvidersWorkingTimeComponent } from './all-providers-working-time.component';

describe('AllProvidersWorkingTimeComponent', () => {
  let component: AllProvidersWorkingTimeComponent;
  let fixture: ComponentFixture<AllProvidersWorkingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProvidersWorkingTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProvidersWorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
