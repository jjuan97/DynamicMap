import { Component, AfterViewInit } from '@angular/core';

// OL imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';

// Ol Marker
//import Marker from 'ol-marker-feature';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  map: Map;

  constructor () {
    this.map = new Map({});
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
  }

}
