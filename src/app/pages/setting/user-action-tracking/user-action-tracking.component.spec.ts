import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionTrackingComponent } from './user-action-tracking.component';

describe('UserActionTrackingComponent', () => {
  let component: UserActionTrackingComponent;
  let fixture: ComponentFixture<UserActionTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
