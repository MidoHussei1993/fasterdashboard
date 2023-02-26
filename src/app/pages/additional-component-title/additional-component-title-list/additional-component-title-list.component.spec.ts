import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalComponentTitleListComponent } from './additional-component-title-list.component';

describe('AdditionalComponentTitleListComponent', () => {
  let component: AdditionalComponentTitleListComponent;
  let fixture: ComponentFixture<AdditionalComponentTitleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalComponentTitleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalComponentTitleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
