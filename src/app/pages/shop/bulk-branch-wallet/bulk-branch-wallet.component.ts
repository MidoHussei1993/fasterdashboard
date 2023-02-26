import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShopBranchWalletService } from '../../wallet/services/shop-branch-wallet.service';

@Component({
  selector: 'app-bulk-branch-wallet',
  templateUrl: './bulk-branch-wallet.component.html',
  styleUrls: ['./bulk-branch-wallet.component.scss']
})
export class BulkBranchWalletComponent implements OnInit {

  file;
  constructor(
    private shopBranchWalletService: ShopBranchWalletService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  async uploadToWalletDiscountByExcel() {
    this.spinner.show();
    this.shopBranchWalletService.uploadToWalletDiscountByExcel(this.file.target.files[0]).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.isSucceeded) {
          this.notifier.notify(
            'success',
            this.translate.instant('global.created')
          );
        }else {
          this.notifier.notify(
            'error',
            res.errorMessage
          );
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

 
}
