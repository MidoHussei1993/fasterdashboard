import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopBranchesWorkTimeComponent } from './add-shop-branches-work-time.component';

describe('AddShopBranchesWorkTimeComponent', () => {
  let component: AddShopBranchesWorkTimeComponent;
  let fixture: ComponentFixture<AddShopBranchesWorkTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopBranchesWorkTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopBranchesWorkTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
