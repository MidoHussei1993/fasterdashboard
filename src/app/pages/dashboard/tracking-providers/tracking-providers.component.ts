import { Component, OnDestroy, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDispatchService } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { HeaderService } from 'src/app/core/services/header.service';
import { MapLoaderService } from 'src/app/shared/components/polygon-map/map.loader';
import { ProviderService } from '../../provider/services';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';

type Provider = {
  applicationUserId: string;
  carType: number;
  connectionId: string;
  fullName: string;
  isBusy: boolean;
  isConnected: boolean;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  profileImage: string;
  registerType: number;
};
@Component({
  selector: 'app-trackingx-providers',
  templateUrl: './tracking-providers.component.html',
  styleUrls: ['./tracking-providers.component.scss'],
})
export class TrackingxProvidersComponent implements OnInit, OnDestroy {
  providers: Provider[] = [];
  markers: any[] = [];
  userOnMap: any[] = [];
  lat = null;
  lng = null;
  map = null;
  connection = null;
  providerInterval = null;
  orderStatusList: any[] = [];
  currentLang: string = '';
  selectedOrderStatusId: any[] = [];

  constructor(
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private providerService: ProviderService,
    private headerService: HeaderService,
    private orderStatusService: OrderStatusService,
    private orderDispatchService: OrderDispatchService
  ) {}

  ngOnDestroy(): void {
    window.clearInterval(this.providerInterval);
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    // this.headerService.setPageTitle(this.translate.instant('menu.tracking'));
    this.getMapProviders();
    this.getDeliveryOrderStatusDDL();
    this.providerInterval = setInterval(() => {
      const selectedIds = this.orderStatusList
        .filter((item) => item.isSelected == true)
        .map(({ id }) => id);
      this.providerService.getMapProviders(selectedIds).subscribe(
        (res) => {
          this.providers = res.returnData;
          this.markers.forEach((marker) => {
            marker.setMap(null);
          });
          this.markers = [];
          this.providers.map((item) => {
            this.addMarker(item);
          });
        },
        (err) => {}
      );
    }, 10000);
    // this.connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Trace)
    //   .withUrl(`https://api.faster.sa:7090/providerHubs`, {
    //     // accessTokenFactory: () =>
    //     // localStorage.getItem('token')
    //     //   ? `${localStorage.getItem('token')}`
    //     //   : '',
    //     // headers: {
    //     //   Authorization: localStorage.getItem('token')
    //     //     ? `${localStorage.getItem('token')}`
    //     //     : '',
    //     // },

    //     skipNegotiation: true,
    //     transport: signalR.HttpTransportType.WebSockets,
    //   })
    //   .withAutomaticReconnect()
    //   .configureLogging(signalR.LogLevel.Trace)
    //   .build();
    // this.connection
    //   .start()
    //   .then(() => {
    //     this.connection.invoke('TrackingProvider', 'Admins');
    //     // connection.invoke('BroadcastLocation', 'Admins');
    //   })
    //   .catch((err) => {
    //     console.log(
    //       '🚀 ~ file: app.component.ts:52 ~ AppComponent ~ ngOnInit ~ err:',
    //       err
    //     );
    //     return console.error(err.toString());
    //   });

    this.connection.on('BroadcastLocation', (...args) => {
      this.setMark(args[0], args[1], args[2]);
    });
    this.connection.on('TrakingDeliveryProviders', (...args) => {
      this.setMark(args[0], args[1], args[2]);
    });
  }

  getDeliveryOrderStatusDDL() {
    this.orderStatusService.DeliveryOrderStatusDDL().subscribe(
      (res) => {
        console.log(
          '🚀 ~ file: tracking-providers.component.ts:118 ~ TrackingxProvidersComponent ~ getDeliveryOrderStatusDDL ~ res:',
          res
        );
        this.orderStatusList = res.map((item) => {
          item.icon = this.setIcon(item.name);
          return item;
        });
        this;
      },
      (err) => {}
    );
  }

  setIcon(item) {
    switch (item) {
      case 'Created':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/campfire.png';
        break;
      case 'Canceled From Admin':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/caution.png';
        break;
      case 'Canceled From Customer':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/red.png';
        break;
      case 'Canceled From Provider':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        break;
      case 'Provider Reached Order':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/ltblue-dot.png';
        break;
      case 'Accepted Offer Price':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/dollar.png';
        break;
      case 'Order Perparing':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/snack_bar.png';
        break;
      case 'Finished':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/rangerstation.png';
        break;
      case 'On Road':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/cabs.png';
        break;
      case 'Canceled From Shop':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/red-pushpin.png';
        break;
      case 'Provider Finished':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        break;
      case 'Shop Accepted':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/grn-pushpin.png';
        break;
      case 'Shop Rejected':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/ylw-pushpin.png';
        break;
      case 'Reached Customer':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/green.png';
        break;
      case 'Damaged':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/earthquake.png';
        break;
      case 'Time Out':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/caution.png';
        break;
      case 'Order Prepared by Shop':
        return 'http://maps.gstatic.com/mapfiles/ms2/micons/pink-pushpin.png';
        break;
      case 'Provider took the order':
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        break;
      default:
        break;
    }
  }

  mapInit() {
    MapLoaderService.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.lat
          ? { lat: this.lat, lng: this.lng }
          : { lat: 24.7135517, lng: 46.6752957 },
        zoom: 12,
      });
      const input: any = document.getElementById('pac-input');
      const searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry');
            return;
          }
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });

      this.providers.map((item) => {
        this.addMarker(item);
      });
    });
  }

  moveToProviderLocation(provider: Provider) {
    const startPoint = new google.maps.LatLng(
      provider.latitude,
      provider.longitude
    );
    this.map.panTo(startPoint);
    this.map.setZoom(12);
    this.connection.on('TrakingDeliveryProviders', (...args) => {
      this.setMark(args[0], args[1], args[2]);
    });
  }

  addMarker(provider: Provider | any) {
    const driverOrderStatus = this.orderStatusList.filter(({id})=>id == provider.providerOrderStatues) 
    const isSetIcon = !!driverOrderStatus.length
    try {
      this.markers.push(
        new google.maps.Marker({
          position: { lat: provider.latitude, lng: provider.longitude },
          map: this.map,
          title: provider.phoneNumber,
          label: provider.fullName,
          ...(isSetIcon && {icon: this.setIcon(driverOrderStatus[0].name)})
          // icon: this.setIcon(this.orderStatusList.filter(({id})=>id == provider.providerOrderStatues)[0].name),
          // animation: google.maps.Animation.DROP,
        })
      );
    } catch (error) {
      console.log('🚀 ~ file: routeMap.vue:116 ~ addMarker ~ error:', error);
    }
  }

  getMapProviders() {
    this.spinner.show();
    const selectedIds = this.orderStatusList
      .filter((item) => item.isSelected == true)
      .map(({ id }) => id);
    this.providerService.getMapProviders(selectedIds).subscribe(
      (res) => {
        this.mapInit();
        console.log(
          '🚀 ~ file: tracking-providers.component.ts:384 ~ TrackingProvidersComponent ~ getDeliveryProviders ~ res:',
          res
        );
        this.providers = res.returnData;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  setMark(lng, lat, user) {
    console.log(
      '🚀 ~ file: tracking-providers.component.ts:390 ~ TrackingProvidersComponent ~ setMark ~ lng, lat,:',
      lng,
      lat
    );
    const currentUser = JSON.parse(user);
    if (
      this.markers.length &&
      this.markers.filter((item) => item.id == currentUser.ApplicationUserId)
        .length
    ) {
      this.markers.map((item) => {
        if (item.id == currentUser.ApplicationUserId) {
          item.position = { lat, lng };
          //  return;
        }
      });
    } else {
      this.markers.push({
        id: currentUser.ApplicationUserId,
        position: {
          lat: lat,
          lng: lng,
        },
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        label: {
          color: 'green',
          fontSize: '12px',
          text: currentUser.FullName,
        },
        title: currentUser.FullName,
        options: {},
      });
    }
  }
}
