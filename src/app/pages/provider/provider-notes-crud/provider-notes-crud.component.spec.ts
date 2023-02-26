import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderNotesCrudComponent } from './provider-notes-crud.component';

describe('ProviderNotesCrudComponent', () => {
  let component: ProviderNotesCrudComponent;
  let fixture: ComponentFixture<ProviderNotesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderNotesCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderNotesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
