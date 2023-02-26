import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Motivation } from '../models';
import { MotivationService } from '../services/motivation.service';

@Component({
  selector: 'app-provider-motivations',
  templateUrl: './provider-motivations.component.html',
  styleUrls: ['./provider-motivations.component.scss']
})
export class ProviderMotivationsComponent implements OnInit {

  motivationList: Motivation[] = [];
  titles:string[] = [
    'field.startAt',
    'field.endAt',
    'field.acceptancePercentageTarget',
    'field.motivationAmount',
    'field.orderTarget',
    'field.onLineMinutesTarget',
    'field.finished',
  ];
  properties: string[] = [
    'startAt',
    'endAt',
    'acceptancPercentageTarget',
    'motivationAmount',
    'orderTarget',
    'onLineMinutesTarget',
    'isActive',
  ];
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();

  currentLanguage: string = '';
  providerid: string ;

  constructor(
    private motivationService: MotivationService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.providerid = this.route.snapshot.params.id;
    this.GetProviderMotivations();
  }

  GetProviderMotivations() {
    this.busyLoading = true;
    this.spinner.show();
    this.motivationService.GetProviderMotivations(this.route.snapshot.params.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.motivationList = res.map((item: any) => {
          if (item.isActive) {
            item.isActive = this.translate.instant('action.yes');
          } else {
            item.isActive = this.translate.instant('action.no');
          }
          return item;
        });
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  navigateToView(motivation: Motivation){
    this.router.navigateByUrl(
      `motivation/provider-motivation-progress/${this.providerid}/${motivation.id}`
    )
  }

}
