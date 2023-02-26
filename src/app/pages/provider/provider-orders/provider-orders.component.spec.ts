import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOrdersComponent } from './provider-orders.component';

describe('ProviderOrdersComponent', () => {
  let component: ProviderOrdersComponent;
  let fixture: ComponentFixture<ProviderOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
