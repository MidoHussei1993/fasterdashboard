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
  selector: 'app-add-shop-branches-work-time',
  templateUrl: './add-shop-branches-work-time.component.html',
  styleUrls: ['./add-shop-branches-work-time.component.scss'],
})
export class AddShopBranchesWorkTimeComponent implements OnInit {
  @Output() created = new EventEmitter<any>();
  mode: FormMode = FormMode.Create;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';

  selectedOption: string;

  days = [
    { name: 'Sunday', value: 1 },
    { name: 'Saturday', value: 2 },
    { name: 'Monday', value: 3 },
    { name: 'Tuesday', value: 4 },
    { name: 'Wednesday', value: 5 },
    { name: 'Thursday', value: 6 },
    { name: 'Friday', value: 7 },
  ];

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
      day: ['', [Validators.required]],
      firstShiftFromHour: ['', [Validators.required]],
      firstShiftToHour: ['', [Validators.required]],
      secondShiftFromHour: [''],
      secondShiftToHour: [''],
    });

    if (this.route.snapshot.data.mode) {
      this.mode = this.route.snapshot.data.mode;
    }
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit(): void {}

  selectChangeHandler(event) {
    console.log(event.message);
  }

  submit() {
    console.log(this.form);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    this.create();
  }
  create() {
    let body = this.form.value;
    this.shopBranchWorkTimeService.updateAllShopBranchsWorkTime(body).subscribe(
      (result) => {
        this.form.reset();
        // this.form.get('id').patchValue(0);
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        this.spinner.hide();
        this.modalService.dismissAll();
        this.created.emit(result);
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
}
