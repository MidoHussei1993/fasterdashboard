import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeCrudComponent } from './food-type-crud.component';

describe('FoodTypeCrudComponent', () => {
  let component: FoodTypeCrudComponent;
  let fixture: ComponentFixture<FoodTypeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTypeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
