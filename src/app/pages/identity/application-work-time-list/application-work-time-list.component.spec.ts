import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWorkTimeListComponent } from './application-work-time-list.component';

describe('ApplicationWorkTimeListComponent', () => {
  let component: ApplicationWorkTimeListComponent;
  let fixture: ComponentFixture<ApplicationWorkTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationWorkTimeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationWorkTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
