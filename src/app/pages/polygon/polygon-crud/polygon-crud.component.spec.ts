import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonCrudComponent } from './polygon-crud.component';

describe('PolygonCrudComponent', () => {
  let component: PolygonCrudComponent;
  let fixture: ComponentFixture<PolygonCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolygonCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
