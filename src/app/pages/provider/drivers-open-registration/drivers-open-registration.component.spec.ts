import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversOpenRegistrationComponent } from './drivers-open-registration.component';

describe('DriversOpenRegistrationComponent', () => {
  let component: DriversOpenRegistrationComponent;
  let fixture: ComponentFixture<DriversOpenRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversOpenRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversOpenRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
