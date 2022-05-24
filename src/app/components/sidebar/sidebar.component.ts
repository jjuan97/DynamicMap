import { Component, OnInit } from '@angular/core';

// Service
import { MarkersService } from 'src/app/services/markers.service';

// Class
import { Marker } from 'src/app/models/marker';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  markers: Marker[];

  constructor(private markersService: MarkersService){
    this.markers = markersService.getAllMarkers();
  }

  ngOnInit(): void {
    this.markersService.myMarkers$.subscribe( newMarkers => this.markers = newMarkers);
  }

  cleanMarkers () {
    this.markersService.clearMarkers();
  }

}
