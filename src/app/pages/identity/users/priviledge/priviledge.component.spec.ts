import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriviledgeComponent } from './priviledge.component';

describe('PriviledgeComponent', () => {
  let component: PriviledgeComponent;
  let fixture: ComponentFixture<PriviledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriviledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriviledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
