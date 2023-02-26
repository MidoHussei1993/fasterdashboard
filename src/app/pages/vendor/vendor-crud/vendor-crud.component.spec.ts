import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCrudComponent } from './vendor-crud.component';

describe('VendorCrudComponent', () => {
  let component: VendorCrudComponent;
  let fixture: ComponentFixture<VendorCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
