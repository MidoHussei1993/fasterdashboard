import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { List } from 'src/app/shared';
import { FormMode } from 'src/app/shared/constant/form-modes';
import { Pagination } from 'src/app/shared/models/pagination';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CoboneReport } from '../../model/cobone-report.model';
import { CoboneTransportFilter } from '../../model/cobone-transport-filter.model';
import { CoboneFilter } from '../../model/cobonefilter.model';
import { CoboneTrasport } from '../../model/cobonetrasport.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-cobonedelevriy',
  templateUrl: './cobonedelevriy.component.html',
  styleUrls: ['./cobonedelevriy.component.scss']
})
export class CobonedelevriyComponent implements OnInit {


  CoboneReport: CoboneTrasport[] = [];
  titles:string[] = [
   'field.typeName',
   'field.customerName',
   'field.bookingDate',
   'field.statusName',
   'field.coponeDiscount',

  ];
  properties:string[] = [
    "typeName",
    "customerName",
    "bookingDate",
    "statusName" ,
    "coponeDiscount",

  ];
  filter:CoboneTransportFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  activeTab:string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private reportServices: ReportsService,
    private router: Router,
    private swalService: SwalModalService,
    private route:ActivatedRoute,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService
  ) {
   }

  ngOnInit(): void {
    this.filter = new CoboneTransportFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcobonetransport(this.filter);
  }

  searchValue(): void {
    this.getcobonetransport(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new CoboneTransportFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
    this.getcobonetransport(this.filter);
  }

  getcobonetransport(filter:CoboneTransportFilter){
    this.busyLoading = true;
    let id = this.route.snapshot.params.id;
    this.reportServices.getcobonedelivery(id,filter).subscribe((res:List<CoboneTrasport>) =>{
      this.busyLoading = false;
      this.CoboneReport = res.data;
      delete res.data;
      this.pagination = {...res}
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
  }
  downloadAll() {
    let downloadFilter: any = this.filter;
    downloadFilter.PageNumber = 1;
    downloadFilter.PageSize = this.pagination.totalItemCount;
    this.spinner.show();
    this.reportServices.getcobonedelivery(this.route.snapshot.params.id, downloadFilter)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.excelService.exportAsExcelFile(res.data, 'data_file');
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
        }
      );
  }
  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getcobonetransport(this.filter);
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getcobonetransport(this.filter);
  }


}
