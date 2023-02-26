import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSizeCrudComponent } from './item-size-crud.component';

describe('ItemSizeCrudComponent', () => {
  let component: ItemSizeCrudComponent;
  let fixture: ComponentFixture<ItemSizeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSizeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSizeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
