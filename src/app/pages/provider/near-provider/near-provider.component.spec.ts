import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearProviderComponent } from './near-provider.component';

describe('NearProviderComponent', () => {
  let component: NearProviderComponent;
  let fixture: ComponentFixture<NearProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
