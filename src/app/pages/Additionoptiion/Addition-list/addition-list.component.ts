import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown, FormMode, List, Pagination } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { AdditionOption, AditionOptionFilter } from '../models';
import { AdditionOptionService } from '../services';

@Component({
  selector: 'app-addition-list',
  templateUrl: './addition-list.component.html',
  styleUrls: ['./addition-list.component.scss']
})
export class AdditionListComponent implements OnInit {


  Additionlist: AdditionOption[] = [];
  titles:string[] = [
    'name English',
    'name Arabic',
    'Note English',
    'Note Arabic',
    'price',


  ];
  properties:string[] = [
    'name',
    'nameAr',
    'note',
    'noteAr',
    'price',


  ];

  propertiesDDL:string[] = [
    'Name',
    'NameAr',
    // 'categoryImage',

  ];

  titlesDeleted:string[]=[];

  filter:AditionOptionFilter;
  busyLoading:boolean = true;
  pagination:Pagination = new Pagination();
  activeTab:string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private additionService: AdditionOptionService,
    private router: Router,
    private swalService: SwalModalService,
  ) {
   }

  ngOnInit(): void {
    this.filter = new AditionOptionFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getAdditionList(this.filter);
  }
  searchValue(): void {
    this.getAdditionList(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new AditionOptionFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }
  getAdditionList(filter:AditionOptionFilter){
    this.busyLoading = true;
    this.additionService.get(filter).subscribe((res:List<AdditionOption>) =>{
      this.busyLoading = false;
      this.Additionlist = res.data;
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
    this.getAdditionList(this.filter);
  }

  setPageNumber(pageNumber:number){
    if(pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.getAdditionList(this.filter);
  }
  deleteItem(item:AdditionOption){
    this.swalService
    .showDeleteConfirmation(item.id)
    .then((result) => {

    }).catch((err) => {

    });
  }
  navigate(addition:AdditionOption,type:FormMode){
    switch (type) {
      case this.formMode.Edit:
        this.router.navigate([`addition/edit/${addition.id}`]);
        break;
        case this.formMode.View:
          this.router.navigate([`addition/view/${addition.id}`]);
        break;

      default:
        break;
    }
  }
}


