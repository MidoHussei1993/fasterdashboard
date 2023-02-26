import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMotivationsProgressComponent } from './provider-motivations-progress.component';

describe('ProviderMotivationsProgressComponent', () => {
  let component: ProviderMotivationsProgressComponent;
  let fixture: ComponentFixture<ProviderMotivationsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderMotivationsProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMotivationsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
