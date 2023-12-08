import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdditionalComponentListComponent } from './sub-additional-component-list.component';

describe('SubAdditionalComponentListComponent', () => {
  let component: SubAdditionalComponentListComponent;
  let fixture: ComponentFixture<SubAdditionalComponentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAdditionalComponentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAdditionalComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
