import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCrudComponent } from './subscription-crud.component';

describe('SubscriptionCrudComponent', () => {
  let component: SubscriptionCrudComponent;
  let fixture: ComponentFixture<SubscriptionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
