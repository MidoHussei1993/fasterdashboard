import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalOptionListComponent } from './additional-option-list.component';

describe('AdditionalOptionListComponent', () => {
  let component: AdditionalOptionListComponent;
  let fixture: ComponentFixture<AdditionalOptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalOptionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
