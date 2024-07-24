import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import * as L from 'leaflet'

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  private placesService = inject(PlacesService);

  public map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  public initMap(){
    console.log(this.placesService.useLocation)
    this.map = L.map('map').setView([51.505, -0.09], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }


}
