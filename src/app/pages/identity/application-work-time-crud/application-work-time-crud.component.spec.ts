import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWorkTimeCrudComponent } from './application-work-time-crud.component';

describe('ApplicationWorkTimeCrudComponent', () => {
  let component: ApplicationWorkTimeCrudComponent;
  let fixture: ComponentFixture<ApplicationWorkTimeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationWorkTimeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationWorkTimeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
