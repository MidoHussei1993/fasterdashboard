import { Component, OnInit } from '@angular/core';
import { ApplicationWorkTimeService } from '../services/ApplicationWorkTime.service';
import { ListComponent } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-application-work-time-list',
  templateUrl: './application-work-time-list.component.html',
  styleUrls: ['./application-work-time-list.component.scss'],
})
export class ApplicationWorkTimeListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  constructor(
    private applicationWorkTimeService: ApplicationWorkTimeService,
    public route: ActivatedRoute,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router,
    private headerService: HeaderService
  ) {
    super(
      applicationWorkTimeService,
      notifier,
      spinner,
      translate,
      route,
      router
    );
    this.titles = [
      'global.day',
      'firstShiftStartAt',
      'firstShiftEndAt',
      'secondShiftStartAt',
      'secondShiftEndAt',
    ];
    this.properties = [
      'createAt',
      'day',
      'fromHour',
      'toHour',
      'secondShiftFromHour',
      'secondShiftToHour',
    ];
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(
      this.translate.instant('ApplicationWorkTimes')
    );
    this.getList((res) => {
      this.list = res;
    });
  }

  save() {
    this.spinner.show();
    this.applicationWorkTimeService.update(this.list).subscribe(
      (res) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('Success'));
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
