import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobonedelevriyComponent } from './cobonedelevriy.component';

describe('CobonedelevriyComponent', () => {
  let component: CobonedelevriyComponent;
  let fixture: ComponentFixture<CobonedelevriyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobonedelevriyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CobonedelevriyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
