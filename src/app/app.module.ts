import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { AuthGuard } from './core/Auth/Guards';
import { ErrorInterceptor, JwtInterceptor } from './core/Http/interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { NotifierModule } from 'angular-notifier';
import { GoogleMapsModule } from '@angular/google-maps';
import { CoboneComponent } from './pages/reports/components/cobone/cobone.component';
import { TransportOrderStatusReportComponent } from './pages/reports/components/transport-order-status-report/transport-order-status-report.component';
import { DeliveryOrderStatusReportComponent } from './pages/reports/components/delivery-order-status-report/delivery-order-status-report.component';
import { ShopOrdersCountReportComponent } from './pages/reports/components/shop-orders-count-report/shop-orders-count-report.component';
import { ProviderCountsReportComponent } from './pages/reports/components/provider-counts-report/provider-counts-report.component';
import { TransportOrderStatusDetailsReportComponent } from './pages/reports/components/transport-order-status-details-report/transport-order-status-details-report.component';
import { DeliveryOrderStatusDetailsReportComponent } from './pages/reports/components/delivery-order-status-details-report/delivery-order-status-details-report.component';
import { NgxEchartsModule } from 'ngx-echarts';
 
// #fake-end#

// function appInitializer(authService: AuthService) {
//   return () => {
//     return new Promise((resolve) => {
//       authService.getUserByToken().subscribe().add(resolve);
//     });
//   };
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NotifierModule,
    GoogleMapsModule,
    NgxEchartsModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   multi: true,
    //   deps: [AuthService],
    // },

    // AuthGuard, // <------------ Include here
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
