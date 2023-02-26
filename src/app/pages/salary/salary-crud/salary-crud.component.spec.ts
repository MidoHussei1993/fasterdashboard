import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCrudComponent } from './salary-crud.component';

describe('SalaryCrudComponent', () => {
  let component: SalaryCrudComponent;
  let fixture: ComponentFixture<SalaryCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
