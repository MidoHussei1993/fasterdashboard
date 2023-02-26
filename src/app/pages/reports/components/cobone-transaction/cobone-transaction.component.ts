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
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-cobone-transaction',
  templateUrl: './cobone-transaction.component.html',
  styleUrls: ['./cobone-transaction.component.scss']
})
export class CoboneTransactionComponent implements OnInit {

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
    private route:ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.filter = new CoboneTransportFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getcobonetransport(this.filter);
  }

  getcobonetransport(filter:CoboneTransportFilter){
    this.busyLoading = true;
    let id = this.route.snapshot.params.id;
    this.reportServices.getcobonetrasport(id,filter).subscribe((res:List<CoboneTrasport>) =>{
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
