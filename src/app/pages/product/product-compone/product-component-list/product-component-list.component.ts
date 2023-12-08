import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ProductService } from '../../services';
import { ProductComponent } from '../models';
import { ProductComponentService } from '../services/product-component.service';
// import { ProductComponent } from '../models';

@Component({
  selector: 'app-product-component-list',
  templateUrl: './product-component-list.component.html',
  styleUrls: ['./product-component-list.component.scss']
})
export class ProductComponentListComponent implements OnInit {
  productComponentList: ProductComponent[] = [];
  @Input() productId: string
  titles: string[] = [
    'product.componantName',
    'product.componantName',
    "field.activation",
    'action.actions',
  ];
  properties: string[] = [
    'componantName',
    'componantNameAr',
  ];
  busyLoading: boolean = true;
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private swalService: SwalModalService,
    private notify: NotifierService,
    private productComponentService: ProductComponentService,
    private translate: TranslateService,
    private notifier: NotifierService,

  ) {}

  ngOnInit(): void {
    this.getproductComponentList();
  }

  getproductComponentList() {
    this.busyLoading = true;
    this.spinner.show();
    this.productService.getProductDetailsByID(this.activatedRoute.snapshot.params.detailsId ?this.activatedRoute.snapshot.params.detailsId:this.productId).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.productComponentList = res.productComponants;
        delete res.data;
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
  
  navigateToCreate() {
    this.router.navigateByUrl(`/product/components/${this.activatedRoute.snapshot.params.detailsId ?this.activatedRoute.snapshot.params.detailsId:this.productId}/create`);
  }
  navigateToEdit(productCompoent: ProductComponent) {
    this.router.navigateByUrl(`/product/components/${this.activatedRoute.snapshot.params.detailsId ?this.activatedRoute.snapshot.params.detailsId:this.productId}/edit/${productCompoent.id}`);
  }
  navigateToView(productCompoent: ProductComponent) {
    this.router.navigateByUrl(`/product/components/${this.activatedRoute.snapshot.params.detailsId ?this.activatedRoute.snapshot.params.detailsId:this.productId}/view/${productCompoent.id}`);
  }
  changeActivation(index: number) {
    this.spinner.show();
    this.productComponentService
      .ChangeActivation(this.productComponentList[index].id)
      .subscribe(
        (res) => {
          this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
          this.getproductComponentList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  deleteComponent(productComponent: ProductComponent) {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.spinner.show();
        this.productComponentService
          .delete(productComponent.id)
          .subscribe(
            (res) => {
              const deletedIndex = this.productComponentList.findIndex(
                (item) => item.id == productComponent.id
              );
              this.productComponentList.splice(deletedIndex, 1);
              this.spinner.hide();
              this.notify.notify(
                'success',
                this.translate.instant('global.deleted')
              );
            },
            (err) => {
              this.spinner.hide();
              this.notify.notify(
                'error',
                this.translate.instant('global.server_error')
              );
              console.log(err);
            }
          );
      }
    });
  }
}