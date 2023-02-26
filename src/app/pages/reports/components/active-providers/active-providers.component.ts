import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProviderCount } from '../../model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-active-providers',
  templateUrl: './active-providers.component.html',
  styleUrls: ['./active-providers.component.scss'],
})
export class ActiveProvidersComponent implements OnInit {
  report:{name:string,count:number}[] = [];
  constructor(
    private reportsService: ReportsService,
    private translate: TranslateService,

    ) {}

  ngOnInit() {
    this.getProviderCountsReport();
  }

  getProviderCountsReport() {
    this.reportsService.getProviderCountsReport().subscribe(
      (res : ProviderCount) => {
        this.report=[
          {name: this.translate.instant('report.activeProviders') ,count:res.activeProviders},
          {name: this.translate.instant('report.notActiveProviders') ,count:res.notActiveProviders},
          {name: this.translate.instant('report.providersHaveOneOrderAtLeast') ,count:res.providersHaveOneOrderAtLeast},
        ]
      },
      (err) => {}
    );
  }
}
