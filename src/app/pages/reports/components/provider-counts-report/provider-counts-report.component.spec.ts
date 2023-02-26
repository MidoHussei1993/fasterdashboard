import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCountsReportComponent } from './provider-counts-report.component';

describe('ProviderCountsReportComponent', () => {
  let component: ProviderCountsReportComponent;
  let fixture: ComponentFixture<ProviderCountsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderCountsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCountsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
