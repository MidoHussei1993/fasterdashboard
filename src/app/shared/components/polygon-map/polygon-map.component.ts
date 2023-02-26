import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MapLoaderService } from './map.loader';

@Component({
  selector: 'app-polygon-map',
  templateUrl: './polygon-map.component.html',
  styleUrls: ['./polygon-map.component.scss'],
})
export class PolygonMapComponent implements AfterViewInit {
  map: any;
  drawingManager: any;
  @Output() locationList: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit() {
    MapLoaderService.load().then(() => {
      this.drawPolygon();
    });
  }

  drawPolygon() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 24.6, lng: 46.7 },
      zoom: 10,
    });

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        // @ts-ignore
        drawingModes: ['polygon'],
      },
    });

    this.drawingManager.setMap(this.map);
    google.maps.event.addListener(
      this.drawingManager,
      'overlaycomplete',
      (event) => {
        // Polygon drawn
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          //this is the coordinate, you can assign it to a variable or pass into another function.
          // alert(event.overlay.getPath().getArray());
          this.locationList.emit(event.overlay.getPath().getArray());
        }
      }
    );
  }
}
