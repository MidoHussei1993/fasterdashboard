import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeComponent } from './work-time.component';

describe('WorkTimeComponent', () => {
  let component: WorkTimeComponent;
  let fixture: ComponentFixture<WorkTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
