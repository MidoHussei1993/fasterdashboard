import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { DeliveryOrderService } from '../../reports/services/delivery-order.service';
import { ReportsService } from '../../reports/services/reports.service';
import { TransportOrderService } from '../../reports/services/transport-order.service';

@Component({
  selector: 'app-near-provider',
  templateUrl: './near-provider.component.html',
  styleUrls: ['./near-provider.component.scss'],
})
export class NearProviderComponent implements OnInit {
  @ViewChild('stateModel', { static: false }) stateModel;

  form: FormGroup;
  userform: FormGroup;
  currentLanguage: string = '';
  nearProviderList: any[] = [];
  currentProviderId: string;
  OrderType: string = '';
  transportOrder: any = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private deliveryOrderService: DeliveryOrderService,
    private transportOrderService: TransportOrderService,
    private swalService: SwalModalService,
    private modalService: NgbModal,
    private reportsService: ReportsService
  ) {
    this.form = this.formBuilder.group({
      radius: ['', [Validators.required]],
    });
    this.userform = this.formBuilder.group({
      price: ['', [Validators.required]],
    });
  }

  openModal() {
    this.modalService.open(this.stateModel, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  ngOnInit(): void {
    this.getTransportOrderDetailsDataReport();
  }

  GetNearProviderToTransportOrder() {
    this.spinner.show();
    this.transportOrderService
      .GetNearProviderToOrder(
        this.activatedRoute.snapshot.params.id,
        this.form.get('radius').value
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.nearProviderList = res;
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  getTransportOrderDetailsDataReport() {
    this.spinner.show();
    this.reportsService
      .TransportOrderDetailsDataReport(this.activatedRoute.snapshot.params.id)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.transportOrder = res.transportOrder
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  assignTransport() {
    this.userform.markAllAsTouched();
    this.spinner.show();
    this.transportOrderService
      .manualAssignment(
        this.activatedRoute.snapshot.params.id,
        this.userform.get('price').value,
        this.currentProviderId
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.modalService.dismissAll();
          this.userform.reset();
          this.notifier.notify(
            'success',
            this.translate.instant('action.done')
          );
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
}
