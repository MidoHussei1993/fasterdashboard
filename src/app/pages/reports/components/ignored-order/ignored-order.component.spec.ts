import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoredOrderComponent } from './ignored-order.component';

describe('IgnoredOrderComponent', () => {
  let component: IgnoredOrderComponent;
  let fixture: ComponentFixture<IgnoredOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgnoredOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgnoredOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
