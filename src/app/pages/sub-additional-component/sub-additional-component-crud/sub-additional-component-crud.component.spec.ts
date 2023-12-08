import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdditionalComponentCrudComponent } from './sub-additional-component-crud.component';

describe('SubAdditionalComponentCrudComponent', () => {
  let component: SubAdditionalComponentCrudComponent;
  let fixture: ComponentFixture<SubAdditionalComponentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdditionalComponentCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdditionalComponentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
