import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchWorkTimeCrudComponent } from './shop-branch-work-time-crud.component';

describe('ShopBranchWorkTimeCrudComponent', () => {
  let component: ShopBranchWorkTimeCrudComponent;
  let fixture: ComponentFixture<ShopBranchWorkTimeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchWorkTimeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchWorkTimeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
