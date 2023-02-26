import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsCrudComponent } from './faqs-crud.component';

describe('FaqsCrudComponent', () => {
  let component: FaqsCrudComponent;
  let fixture: ComponentFixture<FaqsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
