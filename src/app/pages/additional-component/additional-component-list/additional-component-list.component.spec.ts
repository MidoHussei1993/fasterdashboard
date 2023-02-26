import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalComponentListComponent } from './additional-component-list.component';

describe('AdditionalComponentListComponent', () => {
  let component: AdditionalComponentListComponent;
  let fixture: ComponentFixture<AdditionalComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalComponentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
