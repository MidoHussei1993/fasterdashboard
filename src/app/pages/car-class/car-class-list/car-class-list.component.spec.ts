import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarClassListComponent } from './car-class-list.component';

describe('CarClassListComponent', () => {
  let component: CarClassListComponent;
  let fixture: ComponentFixture<CarClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
