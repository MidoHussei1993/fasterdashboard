import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonListComponent } from './polygon-list.component';

describe('PolygonListComponent', () => {
  let component: PolygonListComponent;
  let fixture: ComponentFixture<PolygonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolygonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
