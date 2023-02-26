import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalOptionCrudComponent } from './additional-option-crud.component';

describe('AdditionalOptionCrudComponent', () => {
  let component: AdditionalOptionCrudComponent;
  let fixture: ComponentFixture<AdditionalOptionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalOptionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalOptionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
