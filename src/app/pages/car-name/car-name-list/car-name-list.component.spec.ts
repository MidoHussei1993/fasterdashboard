import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNameListComponent } from './car-name-list.component';

describe('CarNameListComponent', () => {
  let component: CarNameListComponent;
  let fixture: ComponentFixture<CarNameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarNameListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
