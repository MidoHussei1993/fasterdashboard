import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSuggestListComponent } from './general-suggest-list.component';

describe('GeneralSuggestListComponent', () => {
  let component: GeneralSuggestListComponent;
  let fixture: ComponentFixture<GeneralSuggestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralSuggestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSuggestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
