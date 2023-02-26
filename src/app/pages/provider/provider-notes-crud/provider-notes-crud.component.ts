import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { ProviderService } from '../services';

@Component({
  selector: 'app-provider-notes-crud',
  templateUrl: './provider-notes-crud.component.html',
  styleUrls: ['./provider-notes-crud.component.scss'],
})
export class ProviderNotesCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  formSubmited;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private providerService: ProviderService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      status: ['', [Validators.required]],
      providerId: this.route.snapshot.params.id,
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    // if (this.mode === FormMode.View) {
    //   // this.isView = true;
    //   this.form.disable();
    // }
  }

  ngOnInit(): void {}

  create() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.providerService.createProviderNotes(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.form
          .get('providerId')
          .patchValue(this.route.snapshot.params.id);
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
