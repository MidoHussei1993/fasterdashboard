import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarClassCrudComponent } from './car-class-crud.component';

describe('CarClassCrudComponent', () => {
  let component: CarClassCrudComponent;
  let fixture: ComponentFixture<CarClassCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarClassCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarClassCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
