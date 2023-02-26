import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { ShopBranchWorkTimeService } from '../services';

@Component({
  selector: 'app-shop-branch-work-time-crud',
  templateUrl: './shop-branch-work-time-crud.component.html',
  styleUrls: ['./shop-branch-work-time-crud.component.scss'],
})
export class ShopBranchWorkTimeCrudComponent implements OnInit {
  @Output() created = new EventEmitter<any>();
  mode: FormMode = FormMode.Create;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';

  selectedOption: string;


  days = [
    { name: "Sunday", value: 1 },
    { name: "Saturday", value: 2 },
    { name: "Monday", value: 3 },
    { name: "Tuesday", value: 4 },
    { name: "Wednesday", value: 5 },
    { name: "Thursday", value: 6 },
    { name: "Friday", value: 7 }
  ]

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shopBranchWorkTimeService: ShopBranchWorkTimeService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      day: ['', [Validators.required]],
      fromHour: ['', [Validators.required]],
      toHour: ['', [Validators.required]],
      secondShiftFromHour: [''],
      secondShiftToHour: [''],
      shopBranchId: [this.route.snapshot.params.branch, [Validators.required]],
    });

    if (this.route.snapshot.data.mode) {
      this.mode = this.route.snapshot.data.mode;
    }
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getShopBranchById();
    }
  }


  selectChangeHandler(event){
    console.log(event.message);
  }




  getShopBranchById() {
    this.busyLoading = true;
    this.spinner.show();
    this.shopBranchWorkTimeService
      .getByID(this.route.snapshot.params.id)
      .subscribe(
        (shopBranchWorkTime) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.form.patchValue(shopBranchWorkTime);
        },
        (err) => {
          this.busyLoading = false;
          this.spinner.hide();
        }
      );
  }

  submit() {
    console.log(this.form);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.shopBranchWorkTimeService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        this.spinner.hide();
        this.modalService.dismissAll();
        this.created.emit(result)
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.shopBranchWorkTimeService.update(body).subscribe(
      (result) => {
        this.notifier.notify(
          'success',
          this.translate.instant('global.edited')
        );
        this.spinner.hide();
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
}
