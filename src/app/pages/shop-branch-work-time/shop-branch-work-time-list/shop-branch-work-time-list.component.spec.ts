import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchWorkTimeListComponent } from './shop-branch-work-time-list.component';

describe('ShopBranchWorkTimeListComponent', () => {
  let component: ShopBranchWorkTimeListComponent;
  let fixture: ComponentFixture<ShopBranchWorkTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchWorkTimeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchWorkTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
