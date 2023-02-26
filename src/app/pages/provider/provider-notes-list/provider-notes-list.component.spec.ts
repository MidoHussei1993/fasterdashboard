import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderNotesListComponent } from './provider-notes-list.component';

describe('ProviderNotesListComponent', () => {
  let component: ProviderNotesListComponent;
  let fixture: ComponentFixture<ProviderNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderNotesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
