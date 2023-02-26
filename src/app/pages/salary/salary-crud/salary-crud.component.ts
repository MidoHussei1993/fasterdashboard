import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pagination } from 'src/app/shared';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SingleMotivationFilter } from '../../motivations/models';
import { IMotivationReportResult } from '../../motivations/motivation-crud/motivation-crud.component';
import { MotivationService } from '../../motivations/services/motivation.service';
import * as moment from 'moment';
import { VendorService } from '../../vendor/services/vendor.service';

@Component({
  selector: 'app-salary-crud',
  templateUrl: './salary-crud.component.html',
  styleUrls: ['./salary-crud.component.scss'],
})
export class SalaryCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';

  uploadedProvider: { id: number; name: string }[] = [];

  motivationReportResult: IMotivationReportResult[] = [];

  titles: string[] = [
    'field.ProviderId',
    'field.ProviderFullName',
    'field.ProviderPhone',
    'field.totalAmountDesirved',
    'field.acceptancePercentageTarget',
    'field.motivationTypeState',
    'field.Desirved',
    'field.onLineMinutesTarget',
    'field.orderTarget',
  ];
  properties: string[] = [
    'providerId',
    'providerName',
    'providerPhone',
    'totalAmountDesirved',
    'acceptancPercentageTarget',
    'isActive',
    'isDesirved',
    'onLineMinutesTarget',
    'orderTarget',
  ];
  pagination: Pagination = new Pagination();
  filter: SingleMotivationFilter = new SingleMotivationFilter();

  isEvaluate = false;
  motivationData: any = {};
  vendorList: Dropdown[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private motivationService: MotivationService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private vendorService: VendorService
  ) {
    this.form = this.formBuilder.group({
      // id: [0],
      // description: [null],
      // descriptionAr: [null],
      isActive: [true],
      startAt: [''],
      endAt: [''],
      motivationType: ['', [Validators.required]],
      orderTarget: [''],
      motivationAmount: ['', [Validators.required]],
      onLineMinutesTarget: [''],
      acceptancPercentageTarget: ['', [Validators.max(100)]],
      providerIds: [[]],
      isForEach: [false],
      isDaily: [true],
      dateFrom: [null, [Validators.required]],
      dateTo: [null, [Validators.required]],
      timeFrom: [null, [Validators.required]],
      timeTo: [null, [Validators.required]],
      vendorId: [null],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.form.get('isDaily').disable();
    this.getVendorList();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getMotivationById(this.route.snapshot.params.id);
    }
    if (this.route.snapshot.queryParams.motivationId && !this.isEvaluate) {
      this.getMotivationById(this.route.snapshot.queryParams.motivationId);
    }
    if (this.route.snapshot.queryParams.evaluate) {
      this.getEvaluate();
    }
    // this.setValidations();
  }
  getVendorList() {
    this.vendorService.getDropdown().subscribe((res) => {
      this.vendorList = res;
    });
  }

  // setValidations() {
  //   this.form.get('isDaily').valueChanges.subscribe((value) => {
  //     console.log(value);
  //     if (value === true) {
  //       this.form.get('dateFrom').setValidators([Validators.required]);
  //       this.form.get('dateFrom').updateValueAndValidity();
  //       this.form.get('dateTo').setValidators([Validators.required]);
  //       this.form.get('dateTo').updateValueAndValidity();
  //       this.form.get('timeFrom').setValidators([Validators.required]);
  //       this.form.get('timeFrom').updateValueAndValidity();
  //       this.form.get('timeTo').setValidators([Validators.required]);
  //       this.form.get('timeTo').updateValueAndValidity();
  //       this.form.get('startAt').clearValidators();
  //       this.form.get('endAt').clearValidators();
  //     } else {
  //       this.form.get('startAt').setValidators([Validators.required]);
  //       this.form.get('startAt').updateValueAndValidity();
  //       this.form.get('endAt').setValidators([Validators.required]);
  //       this.form.get('endAt').updateValueAndValidity();
  //       this.form.get('dateFrom').clearValidators();
  //       this.form.get('dateTo').clearValidators();
  //       this.form.get('timeFrom').clearValidators();
  //       this.form.get('timeTo').clearValidators();
  //     }
  //   });
  // }

  getEvaluate() {
    this.isEvaluate = true;
    this.spinner.show();
    this.motivationService
      .evaluate(this.route.snapshot.queryParams.evaluate)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.motivationReportResult = res.map((item: any) => {
            if (item.isActive) {
              item.isActive = this.translate.instant('action.yes');
            } else {
              item.isActive = this.translate.instant('action.no');
            }
            if (item.isDesirved) {
              item.isDesirved = this.translate.instant('action.yes');
            } else {
              item.isDesirved = this.translate.instant('action.no');
            }
            return item;
          });
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  // downloadExcelFile() {
  //   this.spinner.show();
  //   this.motivationService.DownloadExcelSample().subscribe(
  //     (data) => {
  //       this.spinner.hide();
  //       let blob = new Blob([data], {
  //         type: 'application/vnd.ms-excel',
  //       });
  //       // url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       document.body.appendChild(a);
  //       const url = window.URL.createObjectURL(blob);
  //       a.href = url;
  //       a.download = 'shop.xls';
  //       a.click();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }

  async uploadShopBranchesFile(event) {
    const file = event.target.files[0];
    console.log(event);
    this.spinner.show();
    this.motivationService.UploadProviderIdsExcel(file).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.returnData.length) {
          this.uploadedProvider = res.returnData;
          this.form
            .get('providerIds')
            .patchValue(this.uploadedProvider.map((item) => item.id));
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getMotivationById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.motivationService.getByID(id, this.filter).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        if (this.route.snapshot.queryParams.motivationId) {
          delete res.motivationData.startAt;
          delete res.motivationData.endAt;
          this.form.patchValue(res.motivationData);
          return;
        }
        res.motivationData.dateFrom = res.motivationData.startAt.split('T')[0];
        res.motivationData.timeFrom = res.motivationData.startAt.split('T')[1];
        res.motivationData.dateTo = res.motivationData.endAt.split('T')[0];
        res.motivationData.timeTo = res.motivationData.endAt.split('T')[1];
        res.motivationData.startAt = new Date(res.motivationData.startAt);
        res.motivationData.endAt = new Date(res.motivationData.endAt);
        this.form.patchValue(res.motivationData);
        this.motivationData = res.motivationData;
        this.motivationReportResult = res.motivationReportResult.data.map(
          (item: any) => {
            if (item.isActive) {
              item.isActive = this.translate.instant('action.yes');
            } else {
              item.isActive = this.translate.instant('action.no');
            }
            if (item.isDesirved) {
              item.isDesirved = this.translate.instant('action.yes');
            } else {
              item.isDesirved = this.translate.instant('action.no');
            }
            return item;
          }
        );
        delete res.motivationReportResult.data;
        this.pagination = { ...res.motivationReportResult };
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getMotivationById(this.route.snapshot.params.id);
    }
    if (this.route.snapshot.queryParams.motivationId && !this.isEvaluate) {
      this.getMotivationById(this.route.snapshot.queryParams.motivationId);
    }
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getMotivationById(this.route.snapshot.params.id);
    }
    if (this.route.snapshot.queryParams.motivationId && !this.isEvaluate) {
      this.getMotivationById(this.route.snapshot.queryParams.motivationId);
    }
  }
  downloadMotivationReportResult() {
    this.excelService.exportAsExcelFile(
      this.motivationReportResult,
      'motivationReportResult'
    );
  }
  downloadMotivationData() {
    this.excelService.exportAsExcelFile(
      [this.motivationData],
      'motivationData'
    );
  }

  submit() {
    this.form.markAllAsTouched();
    // console.log(this.form);
    if (!this.form.valid) return;
    // console.log(this.form);
    this.create();
    // if (this.mode === FormMode.Create) {
    //   this.create();
    // } else {
    //   this.edit();
    // }
  }
  create() {
    let body = this.form.value;
    body.vendorId = +body.vendorId;
    body.isDaily = true;
    // body.startAt = String(moment(body.startAt).format('YYYY-MM-DDTHH:mm:ss'));
    // body.endAt = String(moment(body.endAt).format('YYYY-MM-DDTHH:mm:ss'));
    body.isActive = true;
    if (this.form.get('isForEach').value == true) {
      delete body.acceptancPercentageTarget;
      delete body.onLineMinutesTarget;
    }
    body.dailyMotivationDataDto = {
      dateFrom: this.form.get('dateFrom').value,
      dateTo: this.form.get('dateTo').value,
      timeFrom: this.form.get('timeFrom').value + ':00',
      timeTo: this.form.get('timeTo').value + ':00',
    };
    delete body.dateFrom;
    delete body.dateTo;
    delete body.timeFrom;
    delete body.timeTo;
    delete body.startAt;
    delete body.endAt;

    this.spinner.show();
    this.motivationService.create(body).subscribe(
      (result) => {
        this.form.reset();
        // this.form.get('id').patchValue(0);
        this.form.get('isActive').patchValue(true);
        this.form.get('isForEach').patchValue(false);
        this.form.get('isDaily').patchValue(true);
        this.form.get('providerIds').patchValue([]);
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
  // edit() {
  //   let body = this.form.value;
  //   this.spinner.show();
  //   this.motivationService.update(body).subscribe(result => {
  //     this.spinner.hide();
  //     this.notifier.notify('success',this.translate.instant('global.edited'))
  //   },err=>{
  //     this.spinner.hide();
  //     // this.notifier.notify('error',err)
  //   })
  // }
}
