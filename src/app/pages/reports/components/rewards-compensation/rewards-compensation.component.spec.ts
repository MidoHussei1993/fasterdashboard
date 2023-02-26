import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCompensationComponent } from './rewards-compensation.component';

describe('RewardsCompensationComponent', () => {
  let component: RewardsCompensationComponent;
  let fixture: ComponentFixture<RewardsCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
