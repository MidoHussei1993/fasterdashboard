import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { PolygonFilter } from '../models';
import { PolygonService } from '../services/polygon.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-polygon-list',
  templateUrl: './polygon-list.component.html',
  styleUrls: ['./polygon-list.component.scss'],
})
export class PolygonListComponent
  extends ListComponent<any, PolygonFilter>
  implements OnInit
{
  currentId: number = null;
  filter: PolygonFilter = new PolygonFilter();
  orderTypeList: any[] = [];
  polygonTypeList: any[] = [];
  currentLanguage = '';

  constructor(
    private polygonService: PolygonService,
    public notifier: NotifierService,
    public spinner: NgxSpinnerService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    private headerService: HeaderService,
    private swalService: SwalModalService,
    public router: Router
  ) {
    super(polygonService, notifier, spinner, translate, route, router);
    this.titles = [
      'id',
      'field.Date',
      'field.serviceType',
      'field.districtType',
      'field.note',
    ];
    this.properties = ['id', 'createAt', 'orderType', 'type', 'note'];
    this.navigateTo = 'polygon';
    this.currentLanguage = this.translate.currentLang;
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.PageSize,
      size: this.filter.PageSize,
    };
    this.filter = new PolygonFilter();
    this.filter.PageNumber = pagePagination.page;
    this.filter.PageSize = pagePagination.size;
    this.getList();
  }

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.polygon'));
    this.getList();
    this.GetOrderTypeDDL();
    this.getDropdown();
  }

  GetOrderTypeDDL() {
    this.polygonService.GetOrderTypeDDL().subscribe(
      (res: any) => {
        this.orderTypeList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDropdown() {
    this.polygonService.getDropdown().subscribe(
      (res: any) => {
        this.polygonTypeList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getList() {
    console.log('get list of items');
    this.spinner.show();
    this.polygonService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.list = res.data;
        delete res.data;
        this.pagination = res;
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.polygonService.ChangeActivation(String(this.list[index].id)).subscribe(
      (res) => {
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  deleteItem(item) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.polygonService.delete(item.id).subscribe(
          (res: any) => {
            this.getList();
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
      }
    });
  }

  navigateToView(faqs: any) {
    this.router.navigateByUrl(`/polygon/view/${faqs.id}`);
  }
}
