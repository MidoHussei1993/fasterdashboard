import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoboneComponent } from './cobone.component';

describe('CoboneComponent', () => {
  let component: CoboneComponent;
  let fixture: ComponentFixture<CoboneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoboneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoboneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
