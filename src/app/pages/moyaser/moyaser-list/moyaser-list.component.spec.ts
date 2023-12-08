import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyaserListComponent } from './moyaser-list.component';

describe('MoyaserListComponent', () => {
  let component: MoyaserListComponent;
  let fixture: ComponentFixture<MoyaserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyaserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoyaserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
