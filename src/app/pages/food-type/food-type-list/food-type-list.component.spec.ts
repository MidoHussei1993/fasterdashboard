import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeListComponent } from './food-type-list.component';

describe('FoodTypeListComponent', () => {
  let component: FoodTypeListComponent;
  let fixture: ComponentFixture<FoodTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
