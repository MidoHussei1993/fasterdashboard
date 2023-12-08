import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from '../constant';

export class Crud {
  constructor(
    public mainService: any,
    public notifier: NotifierService,
    public spinner: NgxSpinnerService,
    public translate: TranslateService,
    public route: ActivatedRoute
  ) {}
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';

  getById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.mainService.getById(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  submit() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    console.log(this.form);
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.mainService.create(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('created'));
        this.form.reset();
        this.form.get('id').patchValue(0);
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.mainService.edit(this.route.snapshot.params.id, body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('edited'));
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
