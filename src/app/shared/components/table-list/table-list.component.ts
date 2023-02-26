import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pagination } from '../..';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  @Input() list: any[] = [];
  @Input() properties: string[] = [];
  @Input() titles: string[] = [];

  @Input() pagination: Pagination = new Pagination();

  @Input() showDelete: boolean = true;
  @Input() showEdit: boolean = true;
  @Input() showView: boolean = true;
  @Input() busyLoading: boolean = false;
  @Input() showActivation: boolean = false;
  @Output() changeActivation: EventEmitter<any> = new EventEmitter<any>();

  @Input() showAnotherCheck: boolean = false;
  @Input() AnotherCheckPropName: string = '';
  @Input() AnotherCheckTitelName: string = '';
  @Output() changeAnotherCheck: EventEmitter<any> = new EventEmitter<any>();

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @Input() addActions: boolean = false;
  @Input() actionList: { title: string; icon: string }[] = [];
  @Output() aciton: EventEmitter<any> = new EventEmitter<any>();

  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Input() showSearch: boolean = false;

  active: number = 1;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  changeActivationCol(index: number): void {
    this.changeActivation.emit(index);
  }
  changeAnotherCheckCol(index: number): void {
    this.changeAnotherCheck.emit(index);
  }
  searchValue(): void {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    this.search.emit(this.form.get('search').value);
  }
  resetSearch(): void {
    this.form.reset();
    this.search.emit('');
  }
  View(item: any): void {
    this.view.emit(item);
  }
  Edit(item: any): void {
    this.edit.emit(item);
  }
  Delete(item: any): void {
    this.delete.emit(item);
  }
  EmitAaction(item: any): void {
    this.aciton.emit(item);
  }
}
