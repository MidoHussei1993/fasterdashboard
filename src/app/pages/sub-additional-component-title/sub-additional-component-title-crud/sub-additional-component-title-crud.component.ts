import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { clean } from 'src/app/util';
import { SubAdditionalComponentTitleService } from '../services/sub-additional-component-title.service';

@Component({
  selector: 'app-sub-additional-component-title-crud',
  templateUrl: './sub-additional-component-title-crud.component.html',
  styleUrls: ['./sub-additional-component-title-crud.component.scss']
})
export class SubAdditionalComponentTitleCrudComponent extends Crud
implements OnInit
{
additionalComponentTitleList = [];
constructor(
  private subAdditionalComponentTitleService: SubAdditionalComponentTitleService,
  public route: ActivatedRoute,
  private formBuilder: FormBuilder,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
) {
  super(subAdditionalComponentTitleService, notifier, spinner, translate, route);
  this.form = this.formBuilder.group({
    id:[0],
    title: [
      '',
      [
        Validators.required,
      ],
    ],
    titleAr: [
      '',
      [Validators.required],
    ],
    numberOfSelect: [null],
    isActive: ['', [Validators.required]],
    isRequired: ['', [Validators.required]],
    minOfSelect: [0],
    deliverectPLU: [''],
    deliverectModifierGroupId: [''],
    additionalComponentId: [this.route.snapshot.params.id],

  });
  this.mode = this.route.snapshot.data.mode;
  this.currentLanguage = this.translate.currentLang;
  if (this.mode === FormMode.View) {
    this.form.disable();
  }
}

ngOnInit(): void {
  if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
    this.getById(this.route.snapshot.params.subAdditionalComponentTitleId);
  }
  
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
      this.form.get('additionalComponentId').patchValue(this.route.snapshot.params.id);
    },
    (err) => {
      this.spinner.hide();
      // this.notifier.notify('error',err)
    }
  );
}
}
