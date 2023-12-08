import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdditionalComponentTitleCrudComponent } from './sub-additional-component-title-crud.component';

describe('SubAdditionalComponentTitleCrudComponent', () => {
  let component: SubAdditionalComponentTitleCrudComponent;
  let fixture: ComponentFixture<SubAdditionalComponentTitleCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdditionalComponentTitleCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdditionalComponentTitleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
