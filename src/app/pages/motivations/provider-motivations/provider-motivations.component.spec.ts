import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMotivationsComponent } from './provider-motivations.component';

describe('ProviderMotivationsComponent', () => {
  let component: ProviderMotivationsComponent;
  let fixture: ComponentFixture<ProviderMotivationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderMotivationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMotivationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
