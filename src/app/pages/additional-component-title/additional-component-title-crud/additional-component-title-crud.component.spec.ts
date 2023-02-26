import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalComponentTitleCrudComponent } from './additional-component-title-crud.component';

describe('AdditionalComponentTitleCrudComponent', () => {
  let component: AdditionalComponentTitleCrudComponent;
  let fixture: ComponentFixture<AdditionalComponentTitleCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalComponentTitleCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalComponentTitleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
