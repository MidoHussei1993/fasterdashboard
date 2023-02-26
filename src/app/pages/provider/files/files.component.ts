import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderWalletService } from '../../provider-wallet/services';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  image;
  uploadedimage;
  file;
  constructor(
    private providerWalletService: ProviderWalletService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  async uploadToWalletDiscountByExcel() {
    this.spinner.show();
    this.providerWalletService.uploadToWalletDiscountByExcel(this.file.target.files[0],this.uploadedimage).subscribe(
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
        
        if (res.returnData.length) {
          this.notifier.notify(
            'success',
            this.translate.instant('global.created')
          );
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  async uploadTransferImage() {
    this.uploadedimage = '';
    this.spinner.show();
    this.providerWalletService.UploadImage(this.image.target.files[0]).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.returnData) {
          this.uploadedimage = res.returnData.response;
          this.notifier.notify(
            'success',
            this.translate.instant('global.created')
          );
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
