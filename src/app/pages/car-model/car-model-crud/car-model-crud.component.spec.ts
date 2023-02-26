import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelCrudComponent } from './car-model-crud.component';

describe('CarModelCrudComponent', () => {
  let component: CarModelCrudComponent;
  let fixture: ComponentFixture<CarModelCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarModelCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarModelCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
