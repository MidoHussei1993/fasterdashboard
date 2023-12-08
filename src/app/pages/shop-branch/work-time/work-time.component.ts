import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShopBranchWorkTimeService } from '../../shop-branch-work-time/services';

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.scss'],
})
export class WorkTimeComponent implements OnInit {
  form: FormGroup;
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
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private shopBranchWorkTimeService: ShopBranchWorkTimeService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      shopId: [this.activatedRoute.snapshot.params.id],
      workTimes: new FormArray([]),
    });

    this.days.map((day) => {
      this.addForm('workTimes', this.addWorkTimeForm(day.name));
    });
    console.log(this.form);
  }

  ngOnInit(): void {}
  addForm(controlName, formGroup: FormGroup) {
    (this.form.controls[controlName] as FormArray).push(formGroup);
  }
  addWorkTimeForm(day) {
    const form = this.formBuilder.group({
      day: [day, [Validators.required]],
      firstShiftFromHour: ['', [Validators.required]],
      firstShiftToHour: ['', [Validators.required]],
      secondShiftFromHour: [''],
      secondShiftToHour: [''],
    });
    return form;
  }

  updateAllShopBranchesWorkTime() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

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
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
}
