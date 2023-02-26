import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Dropdown, FormMode } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { PolygonService } from '../services/polygon.service';

@Component({
  selector: 'app-polygon-crud',
  templateUrl: './polygon-crud.component.html',
  styleUrls: ['./polygon-crud.component.scss'],
})
export class PolygonCrudComponent extends Crud implements OnInit {
  orderTypeList: Dropdown[] = [];

  currentWalletAmount: number;
  markers: Marker[] = [];
  polygonTypeList: any[] = [];

  constructor(
    private polygonService: PolygonService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) {
    super(polygonService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      id: [0],
      // createAt: [''],
      note: ['', [Validators.required]],
      orderType: ['', [Validators.required]],
      coordinates: ['', [Validators.required]],
      type: [1, [Validators.required]],
      isActive: [null, [Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getById(this.route.snapshot.params.id)
    }
    this.GetOrderTypeDDL();
    this.getDropdown();
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
  GetOrderTypeDDL() {
    this.polygonService.GetOrderTypeDDL().subscribe((result) => {
      this.orderTypeList = result;
    });
  }
  getById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.polygonService.getById(id).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      res.createAt = res.createAt.split('T')[0];
      this.markers = res.coordinates.map((item) => {
        return {
          position: {
            lat: item.lat,
            lng: item.lng,
          },
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          label: {
            color: 'red ',
            // text: item.descriptionLocation,
            fontSize:'13px'
          },
          // title: item.shopName,
          options: { animation: google.maps.Animation.DROP },
        };
      });
      this.form.patchValue(res)
    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }

  create() {
    console.log(this.form.value);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    let body = this.form.value;
    body.orderType = +body.orderType;
    this.spinner.show();
    this.mainService.create(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('created'));
        setTimeout(() => { 
          location.reload();
         }, 1000)
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
  setCoordinates(event: {lat: number, lng: number}[]){
    console.log(event);
    let locations = []
     event.map(item=>{
      locations.push(`(${item.lat},${item.lng},0)`)
    })
    console.log(locations.join(','))
    this.form.get('coordinates').patchValue(locations.join(','));

  }
}
