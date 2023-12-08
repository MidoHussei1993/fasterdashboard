import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardTypesSendSearchComponent } from './gift-card-types-send-search.component';

describe('GiftCardTypesSendSearchComponent', () => {
  let component: GiftCardTypesSendSearchComponent;
  let fixture: ComponentFixture<GiftCardTypesSendSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardTypesSendSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardTypesSendSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
