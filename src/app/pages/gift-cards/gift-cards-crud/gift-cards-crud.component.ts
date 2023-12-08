import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, FormMode } from 'src/app/shared';
import { GiftCardService } from '../services/gift-card.service';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';

@Component({
  selector: 'app-gift-cards-crud',
  templateUrl: './gift-cards-crud.component.html',
  styleUrls: ['./gift-cards-crud.component.scss'],
})
export class GiftCardsCrudComponent extends Crud implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;

  additionalOptionList = [];
  constructor(
    private giftCardService: GiftCardService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) {
    super(giftCardService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      id: [0],
      title: [''],
      titleAr: [''],
      isActive: [false],
      cardValue: [0],
      backgroundImage: [''],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.giftCardService.UploadImage(file).subscribe((res) => {
      this.form.get('backgroundImage').patchValue(res.returnData.response);
    });
  }

  viewImage() {
    this.imgViewer.openBackDropCustomClass();
  }
}
