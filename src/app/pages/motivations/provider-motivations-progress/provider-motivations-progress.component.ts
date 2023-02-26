import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { MotivationService } from '../services/motivation.service';

interface IMotivationReportResult {
  acceptancPercentageTarget: number;
  isActive: boolean;
  isDesirved: boolean;
  onLineMinutesTarget: number;
  orderTarget: number;
  providerId: number;
  providerName: string;
  providerPhone: string;
  totalAmountDesirved: number;
}
@Component({
  selector: 'app-provider-motivations-progress',
  templateUrl: './provider-motivations-progress.component.html',
  styleUrls: ['./provider-motivations-progress.component.scss']
})
export class ProviderMotivationsProgressComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';


  motivationReportResult: IMotivationReportResult[] = [];

  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private motivationService: MotivationService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      description: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      descriptionAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      isActive: [true, [Validators.required]],
      startAt: ['', [Validators.required]],
      endAt: ['', [Validators.required]],
      motivationType: ['', [Validators.required]],
      orderTarget: ['', [Validators.required]],
      motivationAmount: ['', [Validators.required]],
      onLineMinutesTarget: ['', [Validators.required]],
      acceptancPercentageTarget: ['', [Validators.required]],
      providerIds: ['', [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
      this.form.disable();
  }

  ngOnInit(): void {
      this.GetProviderMotivationProgress();
  }

  GetProviderMotivationProgress() {
    this.busyLoading = true;
    this.spinner.show();
    this.motivationService.GetProviderMotivationProgress(
      this.route.snapshot.params.providerId,
      this.route.snapshot.params.motivationId
      )
    .subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        if (this.route.snapshot.queryParams.motivationId) {
          delete res.motivationData.startAt;
          delete res.motivationData.endAt;
          this.form.patchValue(res.motivationData);
          return;
        }
        res.motivationData.startAt = new Date(res.motivationData.startAt);
        res.motivationData.endAt = new Date(res.motivationData.endAt);
        this.form.patchValue(res.motivationData);
        if (res.providerProfress.isActive) {
          res.providerProfress.isActive = this.translate.instant('action.yes');
        } else {
          res.providerProfress.isActive = this.translate.instant('action.no');
        }
        if (res.providerProfress.isDesirved) {
          res.providerProfress.isDesirved = this.translate.instant('action.yes');
        } else {
          res.providerProfress.isDesirved = this.translate.instant('action.no');
        }
        
        this.motivationReportResult[0] = res.providerProfress;
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

}
