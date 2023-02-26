import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { List } from 'src/app/shared';
import { FormMode } from 'src/app/shared/constant/form-modes';
import { Pagination } from 'src/app/shared/models/pagination';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CoboneReport } from '../../model/cobone-report.model';
import { CoboneFilter } from '../../model/cobonefilter.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-cobone',
  templateUrl: './cobone.component.html',
  styleUrls: ['./cobone.component.scss'],
})
export class CoboneComponent implements OnInit {
  CoboneReport: CoboneReport[] = [];
  conboneObj: CoboneReport = new CoboneReport();
  titles: string[] = [
    'cobone.id',
    'field.CoboneCode',
    'provider.operation_amount',
    'cobone.limitation',
    'field.ExpiryDateFrom',
    'field.ExpiryDateTo',
    'field.ShopName',
    'field.coboneStatus',
    'cobone.transportTotalCoponeDiscount',
    'cobone.transportUsageCount',
    'cobone.deliveryTotalCoponeDiscount',
    'cobone.deliveryUsageCount',
  ];
  properties: string[] = [
    'id',
    'coboneCode',
    'amount',
    'limitation',
    'createAt',
    'expiryDate',
    'shopName',
    'isActive',
    'transportTotalCoponeDiscount',
    'transportUsageCount',
    'deliveryTotalCoponeDiscount',
    'deliveryUsageCount',
  ];
  filter: CoboneFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  activeTab: string = 'created';

  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private reportServices: ReportsService,
    private router: Router,
    private swalService: SwalModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter = new CoboneFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getShopList(this.filter);
  }

  getShopList(filter: CoboneFilter) {
    this.spinner.show();
    this.reportServices.get(filter).subscribe(
      (res: List<CoboneReport>) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.CoboneReport = res.data;
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
        this.busyLoading = false;
      }
    );
  }
  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getShopList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getShopList(this.filter);
  }
  navigateTO(cobone: { event: any; type: string }) {
    switch (cobone.type) {
      case 'product':
        const product = this.router.serializeUrl(
          this.router.createUrlTree(
            [`/cobone-report/delivery/${cobone.event.id}`]
          )
        );
        window.open(product, '_blank');
        break;
    
    }
  }

}
