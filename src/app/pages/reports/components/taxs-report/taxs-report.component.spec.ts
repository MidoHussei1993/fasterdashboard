import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxsReportComponent } from './taxs-report.component';

describe('TaxsReportComponent', () => {
  let component: TaxsReportComponent;
  let fixture: ComponentFixture<TaxsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
