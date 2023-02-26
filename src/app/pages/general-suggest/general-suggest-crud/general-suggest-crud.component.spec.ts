import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSuggestCrudComponent } from './general-suggest-crud.component';

describe('GeneralSuggestCrudComponent', () => {
  let component: GeneralSuggestCrudComponent;
  let fixture: ComponentFixture<GeneralSuggestCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSuggestCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSuggestCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
