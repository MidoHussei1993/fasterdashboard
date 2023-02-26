import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNameCrudComponent } from './car-name-crud.component';

describe('CarNameCrudComponent', () => {
  let component: CarNameCrudComponent;
  let fixture: ComponentFixture<CarNameCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarNameCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNameCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
