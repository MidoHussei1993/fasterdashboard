import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pagination } from '../..';
import { ExcelService } from '../../services/excel.service';
import { SwalModalService } from '../../services/swal-modal.service';
import { ImgViewerComponent } from '../img-viewer/img-viewer.component';

export interface IActionLTable {
  title: string;
  icon: string;
  type?: string;
  link?: string;
  prop?: string;
  hide?: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;
  @Input() list: any[] = [];
  @Input() properties: string[] = [];
  @Input() titles: string[] = [];

  @Input() pagination: Pagination = new Pagination();

  @Input() showDelete: boolean = true;
  @Input() hideActions: boolean = true;
  @Input() showEdit: boolean = true;
  @Input() showView: boolean = true;
  @Input() busyLoading: boolean = false;
  @Input() showActivation: boolean = false;
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @Input() addActions: boolean = false;
  _allowDay: IActionLTable[] = [];
  get actionList(): IActionLTable[] {
    return this._allowDay;
  }
  @Input() set actionList(value: IActionLTable[]) {
    this._allowDay = value.filter((action) => {
      if (action.hasOwnProperty('hide')) {
        return action.hide;
      } else return true;
    });
  }
  // @Input() actionList: IActionLTable[] = [];
  @Output() aciton: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeActivation: EventEmitter<any> = new EventEmitter<any>();

  @Input() showAnotherCheck: boolean = false;
  @Input() AnotherCheckPropName: string = '';
  @Input() AnotherCheckTitelName: string = '';
  @Output() changeAnotherCheck: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetFilter: EventEmitter<any> = new EventEmitter<any>();

  @Input() rowsNumber: Number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  pageSize: number = 10;
  @Output() activetedPageSize = new EventEmitter<number>();
  @Output() activetedPageNumber = new EventEmitter<number>();

  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Input() showSearch: boolean = false;
  @Input() showPagination: boolean = true;
  @Input() isdownloadAll: boolean = false;
  @Output() export = new EventEmitter<number>();

  @Input() isReload: boolean = false;
  @Output() reload = new EventEmitter<any>();

  active: number = 1;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private swalService: SwalModalService, 
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  searchValue(): void {
    this.search.emit(this.form.get('search').value);
  }
  Reload(): void {
    this.reload.emit('');
  }
  reset(): void {
    this.form.reset();
    this.resetFilter.emit('');
  }
  View(item: any): void {
    this.view.emit(item);
  }
  changeActivationCol(index: number): void {
    this.changeActivation.emit(index);
  }

  changeAnotherCheckCol(index: number): void {
    this.changeAnotherCheck.emit(index);
  }

  Edit(item: any): void {
    this.edit.emit(item);
  }

  Delete(item: any): void {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.delete.emit(item);
      }
    });
  }
  EmitAaction(
    item: any,
    action?: {
      title?: string;
      icon?: string;
      type?: string;
      link?: string;
      prop?: string;
    }
  ): void {
    if (action.link) {
      const URL = this.router.serializeUrl(
        this.router.createUrlTree([action.link.replace('$', item[action.prop])])
      );
      window.open(URL, '_blank');
      return;
    }
    this.aciton.emit({
      event: item,
      ...(action.type && { type: action.type }),
    });
  }

  pageSizeChanged(event: string) {
    // console.log(+event.split(': ')[1]);
    // console.log(this.pageSize);
    this.pageSize = Number(+event.split(': ')[1]);
    this.activetedPageSize.emit(+event.split(': ')[1]);
  }
  sendPageNumber(pageNumber: number) {
    this.active = pageNumber;
    this.activetedPageNumber.emit(pageNumber);
  }

  downloadAsExcelFile() {
    if (!this.list.length) return;
    this.excelService.exportAsExcelFile(this.list, 'data_file');
  }
  downloadAllData(): void {
    this.export.emit();
  }

  viewImage(img) {
    this.imgViewer.img = img;
    this.imgViewer.openBackDropCustomClass();
  }
}
