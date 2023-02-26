import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared';
import { FormMode } from 'src/app/shared/constant/form-modes';
import { Pagination } from 'src/app/shared/models/pagination';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { CoboneReport } from '../../model/cobone-report.model';
import { CoboneTransportFilter } from '../../model/cobone-transport-filter.model';
import { CoboneFilter } from '../../model/cobonefilter.model';
import { CoboneTrasport } from '../../model/cobonetrasport.model';
import { TransportStatusOrderFilter } from '../../model/trasportOrderfilter.model';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-transport-order-status-report',
  templateUrl: './transport-order-status-report.component.html',
  styleUrls: ['./transport-order-status-report.component.scss']
})
export class TransportOrderStatusReportComponent implements OnInit {

  CoboneReport: CoboneTrasport[] = [];
  titles:string[] = [

    "typeName",
    "customerName",
    "createAt",
    "bookingDate",
    "statusName" ,
    "coponeDiscount",
       "customerLatitude",
    "customerLongitude",

  ];
  properties:string[] = [
    "typeName",
    "customerName",
    "createAt",
    "bookingDate",
    "statusName" ,
    "coponeDiscount",
       "customerLatitude",
    "customerLongitude",

  ];
  filter:TransportStatusOrderFilter;
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
    private route:ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.filter = new TransportStatusOrderFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcobonetransport(this.filter);
  }

  getcobonetransport(filter:TransportStatusOrderFilter){
    this.busyLoading = true;
    let id = this.route.snapshot.params.id;
    this.reportServices.transportorderStatus(id,filter).subscribe((res:List<CoboneTrasport>) =>{
      this.busyLoading = false;
      this.CoboneReport = res.data;
      delete res.data;
      this.pagination = {...res}
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
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

   navigate(conboneObj:CoboneReport,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`cobone-report/delivery/${conboneObj.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`cobone-report/details/${conboneObj.id}`]);
          break;

      default:
        break;
    }
  }

}
