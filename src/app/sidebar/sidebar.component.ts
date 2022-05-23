import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  markers: Array<string>;

  constructor(){
    this.markers = ['10,-70', '20, 50'];
  }

  ngOnInit(): void {
  }

  cleanMarkers () {
    this.markers = [];
  }

}
