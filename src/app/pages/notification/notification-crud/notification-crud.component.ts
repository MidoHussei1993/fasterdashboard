import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification-crud',
  templateUrl: './notification-crud.component.html',
  styleUrls: ['./notification-crud.component.scss'],
})
export class NotificationCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  typeList: Dropdown[] = [];
  userType: Dropdown[] = [];
  uploadedProvider: { id: number; name: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      message: ['', [Validators.required]],
      messageAr: ['', [Validators.required]],
      type: [''],
      notificationImage: [''],
      userType: ['', [Validators.required]],
      userIds: [[]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getNotificationById(this.route.snapshot.params.id);
    }
    this.getNotificationTypeDDL();
    this.getNotificationUserTypeDDL();
  }

  getNotificationTypeDDL() {
    this.notificationService.getNotificationTypeDDL().subscribe(
      (res: any) => {
        this.typeList = res.returnData;
      },
      (err) => {}
    );
  }
  getNotificationUserTypeDDL() {
    this.notificationService.getNotificationUserTypeDDL().subscribe(
      (res: any) => {
        this.userType = res.returnData;
      },
      (err) => {}
    );
  }

  getNotificationById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.notificationService.getByID(id).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

  async uploadShopBranchesFile(event) {
    const file = event.target.files[0];
    if(this.form.get('userType').value == 7){
      this.spinner.show();
      this.notificationService.UploadProviderIdsExcel(file).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.returnData.length) {
            this.uploadedProvider = res.returnData;
            this.form
              .get('userIds')
              .patchValue(this.uploadedProvider.map((item) => item.id));
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
    if(this.form.get('userType').value == 8){
      this.spinner.show();
      this.notificationService.UploadCustomerIdsExcel(file).subscribe(
        (res) => {
          this.spinner.hide();
          if (res.returnData.length) {
            this.uploadedProvider = res.returnData;
            this.form
              .get('userIds')
              .patchValue(this.uploadedProvider.map((item) => item.id));
          }
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  
  }

  submit() {
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
    body.userType = +body.userType;
    this.notificationService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
        // this.form
        //       .get('userIds')
        //       .patchValue(this.uploadedProvider.map((item) => item.id));
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
    this.notificationService.update(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.edited')
        );
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
