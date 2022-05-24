import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../models/marker';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  private markers: Marker[] = [
    new Marker(-74.10384211031356, 4.653920897099678),
    new Marker(-76.59330319997774, 2.459357539353446)
  ];
  private myMarkers = new BehaviorSubject<Marker[]>( this.markers );

  myMarkers$ = this.myMarkers.asObservable();

  constructor() { }

  addMarker (marker : Marker) {
    this.markers.push(marker);
    this.myMarkers.next(this.markers);
  }

  getAllMarkers(): Marker[]{
    return this.markers;
  }

  clearMarkers() {
    this.markers = [];
    this.myMarkers.next(this.markers);
  }
}
