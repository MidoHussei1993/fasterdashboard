import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoboneTransactionComponent } from './cobone-transaction.component';

describe('CoboneTransactionComponent', () => {
  let component: CoboneTransactionComponent;
  let fixture: ComponentFixture<CoboneTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoboneTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoboneTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
