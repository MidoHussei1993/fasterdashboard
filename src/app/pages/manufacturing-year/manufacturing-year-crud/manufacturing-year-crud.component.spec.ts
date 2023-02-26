import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingYearCrudComponent } from './manufacturing-year-crud.component';

describe('ManufacturingYearCrudComponent', () => {
  let component: ManufacturingYearCrudComponent;
  let fixture: ComponentFixture<ManufacturingYearCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufacturingYearCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingYearCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
