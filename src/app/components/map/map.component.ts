import { Component, OnInit, AfterViewInit } from '@angular/core';

// OL imports
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import {fromLonLat, transform} from 'ol/proj';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';

// Services
import { MarkersService } from 'src/app/services/markers.service';

// Class
import { Marker } from 'src/app/models/marker';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: Map;
  markers: Marker[];
  lat: number = 0;
  lon: number = 0;

  constructor (private markersService: MarkersService) {
    this.map = new Map({});
    // Starting markers
    this.markers = markersService.getAllMarkers();
  }

  ngOnInit(): void {
    this.initMap();

    // Marker subscribe
    this.markersService.myMarkers$.subscribe( newmarkers => {
      this.markers = newmarkers;
      if (this.markers.length == 0) {
        this.remove()
      }
    });
  }

  ngAfterViewInit(): void {
    // Create new markers
    this.map.on('singleclick', (e) => this.controlMarkers(e));
  }

  initMap() {
    // Create Map
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        })
      ],
      view: new View({
        center: fromLonLat([-74, 5]),
        zoom: 5,
      }),
      target: 'ol-map',
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });

    // Create popup style
    const element: any = document.getElementById('popup');
    const popup = new Overlay({
      id:0,
      element: element,
      autoPan: {
        animation: {
          duration: 250,
        },
      }
    });
    this.map.addOverlay(popup);

    // Add Example Layers
    for (let marker of this.markers){
      this.map.addLayer(marker.generateLayer());
    }

  }

  getCoordinates(coordinate: any){
    let lonLat = transform(coordinate, 'EPSG:3857', 'EPSG:4326');
    let lon = lonLat[0];
    let lat = lonLat[1];
    return {lon, lat};
  }

  controlMarkers(e: any) { 
    const feature = e.map.forEachFeatureAtPixel(e.pixel, function (feature: any) {
      return feature;
    });

    // Add new marker
    if (!feature) {
      let { lon, lat } = this.getCoordinates(e.coordinate);
      let marker = new Marker(lon, lat);
      this.markersService.addMarker(marker);
      this.map.addLayer(marker.generateLayer());
    }
    // Show Popup
    else {
      this.showPopup(e);
    }
  }

  showPopup(e: any) {
    let popup = this.map.getOverlayById(0);
    const coordinate = e.coordinate;
    const {lon, lat} = this.getCoordinates(coordinate);
    this.lon = lon;
    this.lat = lat;
    popup.setPosition(coordinate);
  }

  closePopup(){
    const popup = this.map.getOverlayById(0);
    console.log(popup); 
    popup.setPosition(undefined);
    return false;
  }

  remove() {
    const layers = this.map.getAllLayers();
    const layerToRemove = layers.slice(1, layers.length);
    for (let layer of layerToRemove) {
      this.map.removeLayer(layer);
    }
  }

}
