import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBranchListComponent } from './shop-branch-list.component';

describe('ShopBranchListComponent', () => {
  let component: ShopBranchListComponent;
  let fixture: ComponentFixture<ShopBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBranchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
