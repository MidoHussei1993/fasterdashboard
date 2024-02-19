import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { ProductAdditionalOption } from '../../models';
import { ProductService } from '../../services';
import { ProductAdditionalOptionService } from '../services';
import { AdditionalComponentService } from 'src/app/pages/additional-component/services/additional-component.service';

@Component({
  selector: 'app-product-additional-options-list',
  templateUrl: './product-additional-options-list.component.html',
  styleUrls: ['./product-additional-options-list.component.scss']
})
export class ProductAdditionalOptionsListComponent implements OnInit {
  productAdditionalOptionList: ProductAdditionalOption[] = [];
  titles: string[] = ['field.name', 'field.name', 'field.price'];
  properties: string[] = ['name', 'nameAr', 'price'];
  busyLoading: boolean = true;
  busyDeleteing: boolean = true;
  public get formMode(): typeof FormMode {
    return FormMode;
  }
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swalService: SwalModalService,
    private productService: ProductService,
    private productAdditionalOptionService: ProductAdditionalOptionService,
    private notify: NotifierService,
    private translate: TranslateService,
    private additionalComponentService: AdditionalComponentService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getShopList();
  }

  getShopList() {
    this.busyLoading = true;
    this.spinner.show();
    this.productService
      .GetProductAdditionalOptions(this.activatedRoute.snapshot.params.productId)
      .subscribe(
        (res: ProductAdditionalOption[]) => {
          this.busyLoading = false;
          this.spinner.hide();
          this.productAdditionalOptionList = res;
        },
        (err) => {
          console.log(err);
          this.busyLoading = false;
          this.spinner.hide();
        }
      );
  }
  navigateToCreate(){
    this.router.navigateByUrl(`product/additional-options/${this.activatedRoute.snapshot.params.productId}/create`)
  }
  changeActivation(index: number) {
    console.log(index);
    this.spinner.show();
    this.additionalComponentService.ChangeActivation(this.productAdditionalOptionList[index].id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getShopList();
        },
        (err) => {
          this.spinner.hide(); 
        }
      );
  }
  
  navigate(productAdditionalOption: ProductAdditionalOption, type: FormMode) {
    switch (type) {
      case this.formMode.Delete:
        this.swalService.deleteConfirmation().then((res) => {
          if (res) {
            this.busyDeleteing = true;
            this.productAdditionalOptionService
              .delete(productAdditionalOption.id)
              .subscribe(
                (res) => {
                  const deletedIndex = this.productAdditionalOptionList.findIndex(
                    (item) => item.id == productAdditionalOption.id
                  );
                  this.productAdditionalOptionList.splice(deletedIndex, 1);
                  this.notify.notify(
                    'success',
                    this.translate.instant('global.deleted')
                  );
                },
                (err) => {
                  this.notify.notify(
                    'error',
                    this.translate.instant('global.server_error')
                  );
                  console.log(err);
                }
              );
          }
        });
        break;

      default:
        break;
    }
  }
}