import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deleted, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { Cobone, CoboneFilter } from '../models';
import { CoboneService } from '../services';

@Component({
  selector: 'app-cobone-list',
  templateUrl: './cobone-list.component.html',
  styleUrls: ['./cobone-list.component.scss']
})
export class CoboneListComponent implements OnInit {
  Cobonelist: Cobone[] = [];
  cobonelistDeleted:Deleted[] = [];
  titles:string[] = [
    'coboneCode',
    'expiryDate',
    'shopName',
    'shopNameAr',

  ];
  properties:string[] = [
    'coboneCode',
    'expiryDate',
    'shopName',
    'shopNameAr',

  ];
  filter:CoboneFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  activeTab:string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private coboneService: CoboneService,
    private router: Router,
    private swalService: SwalModalService,
  ) {
   }

  ngOnInit(): void {
    this.filter = new CoboneFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getShopList(this.filter);
    this.getDeletedShopList();
  }

  getShopList(filter:CoboneFilter){
    this.busyLoading = true;
    this.coboneService.get(filter).subscribe((res:List<Cobone>) =>{
      this.busyLoading = false;
      this.Cobonelist = res.data;
      delete res.data;
      this.pagination = {...res}
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
  }
  getDeletedShopList(){
    this.busyLoading = true;
    this.coboneService.Deleted().subscribe((res:Deleted[]) =>{
      this.busyLoading = false;
      this.cobonelistDeleted = res
    }, err =>{
      console.log(err);
      this.busyLoading = false;
    })
  }

  setPageSize(pageSize){
    if(pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getShopList(this.filter);
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getShopList(this.filter);
  }
  deleteItem(item:Cobone){
    this.swalService
    .showDeleteConfirmation(item.coboneCode)
    .then((result) => {

    }).catch((err) => {

    });
  }
  navigate(shop:Cobone,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`cobone/edit/${shop.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`cobone/view/${shop.id}`]);
        break;

      default:
        break;
    }
  }
}
