import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

export type Marker = {
  id?: any;
  title: string;
  position: { lat: number; lng: number };
  label: { color: string; text: string; fontSize?: any };
  options: any;
  icon?: any;
};
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  center = { lat: 24.6, lng: 46.7 };
  markerOptions = { draggable: false };
  @Input() markerPositions: google.maps.LatLngLiteral[] = [];
  @Input() titleList: string[] = [];
  // =================================================================================================
  // markers.push({
  //   position: {
  //     lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
  //     lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
  //   },
  //   label: {
  //     color: 'red',
  //     text: 'Marker label ' + (this.markers.length + 1),
  //   },
  //   title: 'Marker title ' + (this.markers.length + 1),
  //   options: { animation: google.maps.Animation.BOUNCE },
  // })
  // ==============================================
  @Input() markers: Marker[] = [];
  @Input() disabled: boolean = false;
  zoom = 10;
  display?: google.maps.LatLngLiteral;
  @Output() marker: EventEmitter<{ lat: number; lng: number }> =
    new EventEmitter<any>();
  ngOnInit(): void {}
  addMarker(event: google.maps.MouseEvent) {
    if (this.disabled) return;
    console.log(...arguments);
    console.log(event.latLng);
    this.marker.emit({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    this.markerPositions[0] = event.latLng.toJSON();
  }

  move(event: any) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: any) {
    console.log(marker);
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }
}
