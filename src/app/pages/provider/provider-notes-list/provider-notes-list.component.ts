import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, FormMode } from 'src/app/shared';
import { AllCity } from '../../city/city-list/Cities.model';
import { City } from '../../city/city.model';
import { ProviderNotesFilter } from '../models';
import { ProviderService } from '../services';

@Component({
  selector: 'app-provider-notes-list',
  templateUrl: './provider-notes-list.component.html',
  styleUrls: ['./provider-notes-list.component.scss']
})
export class ProviderNotesListComponent implements OnInit {
  notesList: any[] = [];
  @Input('providerId') providerId = null;

  titles: string[] = [
    'category.Date',
    'global.full_name',
    'forgetPassword.userName',
    'field.email',
    'field.phoneNumber',
    'field.note',
  ];
  properties: string[] = [
    'createAt',
    'fullName',
    'userName',
    'email',
    'phoneNumber',
    'status',
  ];
  filter: ProviderNotesFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  activeTab: string = 'created';
  public get formMode(): typeof FormMode {
    return FormMode;
  }

  // inject service
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private spinenr: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter = new ProviderNotesFilter();
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.ProviderNotes(this.filter);
  }
  resetfilter() {
    let pagePagination = {
      PageNumber: this.filter.PageNumber,
      PageSize: this.filter.PageSize,
    };
    this.filter = new ProviderNotesFilter();
    this.filter.PageNumber = pagePagination.PageNumber;
    this.filter.PageSize = pagePagination.PageSize;
  }

  searchValue(): void {
    this.ProviderNotes(this.filter);
  }
  // get all city
  ProviderNotes(filter: ProviderNotesFilter) {
    this.busyLoading = true;
    let id;
    if(this.providerId) id = this.providerId;
    else id = this.activatedRoute.snapshot.params.id
    this.providerService.getProviderNotes(id,filter).subscribe(
      (res: any) => {
        this.busyLoading = false;
        this.notesList = res.data;
        delete res.data;
        this.pagination = { ...res };
      },
      (err) => {
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.ProviderNotes(this.filter);
  }

  setPageNumber(pageNumber: any) {
    if (pageNumber == this.filter.PageNumber) return;
    this.filter.PageNumber = pageNumber;
    this.ProviderNotes(this.filter);
  }

  navigateToCreate(){
    if(this.providerId)this.router.navigateByUrl(`providers/notes/${this.providerId}/create`)
    else this.router.navigateByUrl(`providers/notes/${this.activatedRoute.snapshot.params.id}/create`)
  }

  // navigate(country: City, type: FormMode) {
  //   switch (type) {
  //     case this.formMode.Edit:
  //       this.router.navigate([`city/edit/${country.id}`]);
  //       break;
  //     case this.formMode.View:
  //       this.router.navigate([`city/view/${country.id}`]);
  //       break;

  //     default:
  //       break;
  //   }
  // }
}
