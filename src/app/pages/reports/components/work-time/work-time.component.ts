import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkTimeReport, WorkTimeReportFilter } from 'src/app/pages/provider/models';
import { ProviderService } from 'src/app/pages/provider/services';
import { Pagination, FormMode } from 'src/app/shared';

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.scss']
})
export class WorkTimeComponent implements OnInit {
  workTimeRportList: any[] = [];
  finalTotalMinutes:number = null;
  filter: WorkTimeReportFilter;
  busyLoading: boolean = true;
  pagination: Pagination = new Pagination();
  rowsNumber: Number[] = [10, 20, 30, 40, 50];
  active: number = 1;
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  form: FormGroup;

  constructor(
    private providerService: ProviderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
    ) {
      this.form = this.formBuilder.group({
        CreateAtFrom: [''],
        CreateAtTo: [''],
      });
    }

  ngOnInit(): void {
    this.filter = new WorkTimeReportFilter();
    this.workTimeRportList = [];
    this.filter.PageNumber = 1;
    this.filter.PageSize = 10;
    this.getworkTimeRportList(this.filter);
  }

  searchValue(): void {
    this.filter.CreateAtFrom = this.form.get('CreateAtFrom').value;
    this.filter.CreateAtTo = this.form.get('CreateAtTo').value;
    this.getworkTimeRportList(this.filter);
  }
  resetSearch(): void {
    this.form.reset();
    this.filter.ProviderId = null;
    this.getworkTimeRportList(this.filter);
  }

  getworkTimeRportList(filter: WorkTimeReportFilter) {
    this.workTimeRportList = [];
    this.busyLoading = true;
    this.spinner.show();
    this.providerService.getProviderWorkTimeReport(this.activatedRoute.snapshot.params.id,filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.finalTotalMinutes = res.finalTotalMinutes;
        this.workTimeRportList = res.providerActivityTimeReportPaginated.data;
        delete res.data;
        this.pagination = { ...res.providerActivityTimeReportPaginated};
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  setPageSize(event) {
    let pageSize = Number(+event.split(': ')[1]);
    if (pageSize == this.filter.PageSize) return;
    this.filter.PageSize = pageSize;
    this.getworkTimeRportList(this.filter);
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.PageNumber) return;
    this.active = pageNumber;
    this.filter.PageNumber = pageNumber;
    this.getworkTimeRportList(this.filter);
  }

}
