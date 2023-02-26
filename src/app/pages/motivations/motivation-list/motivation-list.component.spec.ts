import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationListComponent } from './motivation-list.component';

describe('MotivationListComponent', () => {
  let component: MotivationListComponent;
  let fixture: ComponentFixture<MotivationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
