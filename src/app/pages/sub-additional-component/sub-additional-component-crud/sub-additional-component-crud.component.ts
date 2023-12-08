import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { SubAdditionalComponentService } from '../services/sub-additional-component.service';
import { clean } from 'src/app/util';

@Component({
  selector: 'app-sub-additional-component-crud',
  templateUrl: './sub-additional-component-crud.component.html',
  styleUrls: ['./sub-additional-component-crud.component.scss']
})
export class SubAdditionalComponentCrudComponent extends Crud implements OnInit {
  additionalComponentTitleList = [];
  constructor(
    private subAdditionalComponentService: SubAdditionalComponentService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) {
    super(subAdditionalComponentService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      id: [0],
      componentName: [
        '',
        [
          Validators.required
        ],
      ],
      componentNameAr: [
        '',
        [Validators.required],
      ],
      price: [0],
      snoozeStart: [''],
      snoozeEnd: [''],
      deliverectModifierId: [''],
      deliverectPLU: [''],
      subAdditionalComponentTitleId:[this.route.snapshot.params.id],
      minOfSelect: [0],
      maxOfSelect: [0],
      defaultQuantity: [null],

    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
  }

  getById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.subAdditionalComponentService.getById(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        res.snoozeStart = new Date(res.snoozeStart);
        res.snoozeEnd = new Date(res.snoozeEnd);
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  create() {
    let body = this.form.value;
    this.spinner.show();
    this.mainService.create(clean(body)).subscribe(
      (result) => {
        this.notifier.notify('success', this.translate.instant('created'));
        this.spinner.hide();
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.form.get('subAdditionalComponentTitleId').patchValue(this.route.snapshot.params.id);
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }


}
