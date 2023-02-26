import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationCrudComponent } from './motivation-crud.component';

describe('MotivationCrudComponent', () => {
  let component: MotivationCrudComponent;
  let fixture: ComponentFixture<MotivationCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivationCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
