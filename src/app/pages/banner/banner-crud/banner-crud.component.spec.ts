import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCrudComponent } from './banner-crud.component';

describe('BannerCrudComponent', () => {
  let component: BannerCrudComponent;
  let fixture: ComponentFixture<BannerCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
