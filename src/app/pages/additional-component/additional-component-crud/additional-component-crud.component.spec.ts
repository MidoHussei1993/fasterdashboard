import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalComponentCrudComponent } from './additional-component-crud.component';

describe('AdditionalComponentCrudComponent', () => {
  let component: AdditionalComponentCrudComponent;
  let fixture: ComponentFixture<AdditionalComponentCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalComponentCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalComponentCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
