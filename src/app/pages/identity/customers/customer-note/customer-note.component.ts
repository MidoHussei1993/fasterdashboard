import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerNoteFilter, CustomerService, FormMode, Pagination, Pattern } from 'src/app/shared';

@Component({
  selector: 'app-customer-note',
  templateUrl: './customer-note.component.html',
  styleUrls: ['./customer-note.component.scss']
})
export class CustomerNoteComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  currentLanguage: string = '';
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  busyLoading: boolean = false;
  filter: CustomerNoteFilter = new CustomerNoteFilter();
  customerNoteList: any[] = []

  
  constructor(
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      status: [
        '',
        [Validators.required],
      ],
      customerId: ['', Validators.required],
      applicationUserId: ['', Validators.required],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getCustoemrNotes();
  }

  getCustoemrNotes(){
    this.spinner.show();
    this.busyLoading = true;
    this.customerService.getCustomerNote(this.route.snapshot.params.id, this.filter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.customerNoteList = res.data;
        },
        (err) => {
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }

  setPageSize(event) {
    let pageSize = Number(+event.split(': ')[1]);
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getCustoemrNotes();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.active = pageNumber;
    this.filter.PageNumber = pageNumber;
    this.getCustoemrNotes();
  }

  create() {
    this.form.get('customerId').patchValue(+this.route.snapshot.params.id)
    this.form.get('applicationUserId').patchValue(this.route.snapshot.queryParamMap.get('userId'))
    let body = this.form.value;
    body.applicationUserId = String(body.applicationUserId);
    body.phoneNumber = String(body.phoneNumber); 
    this.spinner.show();
    this.customerService.addCustomerNote(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('global.created'))
        this.getCustoemrNotes();

      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }

}
