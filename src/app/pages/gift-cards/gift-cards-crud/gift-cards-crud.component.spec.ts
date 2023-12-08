import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardsCrudComponent } from './gift-cards-crud.component';

describe('GiftCardsCrudComponent', () => {
  let component: GiftCardsCrudComponent;
  let fixture: ComponentFixture<GiftCardsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
