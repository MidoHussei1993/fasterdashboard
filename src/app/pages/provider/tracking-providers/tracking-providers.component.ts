import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDispatchService } from 'src/app/shared';
import { Marker } from 'src/app/shared/components';
import { ProviderService } from '../services';
import { HeaderService } from 'src/app/core/services/header.service';
import { MapLoaderService } from 'src/app/shared/components/polygon-map/map.loader';

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
  selector: 'app-tracking-providers',
  templateUrl: './tracking-providers.component.html',
  styleUrls: ['./tracking-providers.component.scss'],
})
export class TrackingProvidersComponent implements OnInit {
  providers: Provider[] = [];
  markers: any[] = [];
  userOnMap: any[] = [];
  lat = null;
  lng = null;
  map = null;
  connection = null;

  constructor(
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private providerService: ProviderService,
    private headerService: HeaderService,
    private orderDispatchService: OrderDispatchService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle(this.translate.instant('menu.tracking'));
    this.getMapProviders();
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Trace)
      .withUrl(`https://api.faster.sa:7090/providerHubs`, {
        // accessTokenFactory: () =>
        // localStorage.getItem('token')
        //   ? `${localStorage.getItem('token')}`
        //   : '',
        // headers: {
        //   Authorization: localStorage.getItem('token')
        //     ? `${localStorage.getItem('token')}`
        //     : '',
        // },

        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Trace)
      .build();
    this.connection
      .start()
      .then(() => {
        this.connection.invoke('TrackingProvider', 'Admins');
        // connection.invoke('BroadcastLocation', 'Admins');
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: app.component.ts:52 ~ AppComponent ~ ngOnInit ~ err:',
          err
        );
        return console.error(err.toString());
      });

    this.connection.on('BroadcastLocation', (...args) => {
      this.setMark(args[0], args[1], args[2]);
    });
    this.connection.on('TrakingDeliveryProviders', (...args) => {
      this.setMark(args[0], args[1], args[2]);
    });
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

  addMarker(provider: Provider) {
    try {
      const image = {
        url: provider.profileImage,

        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(150, 150),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
      };
      this.markers.push(
        new google.maps.Marker({
          position: { lat: provider.latitude, lng: provider.longitude },
          map: this.map,
          title: provider.phoneNumber,
          label: provider.fullName,
          // icon: image,
          animation: google.maps.Animation.DROP,
        })
      );
    } catch (error) {
      console.log('🚀 ~ file: routeMap.vue:116 ~ addMarker ~ error:', error);
    }
  }

  getMapProviders() {
    this.spinner.show();
    this.providerService.getMapProviders().subscribe(
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
