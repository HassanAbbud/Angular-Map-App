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

  private southWest = L.latLng(-89.98155760646617, -180);
  private northEast = L.latLng(89.99346179538875, 180);
  private bounds = L.latLngBounds(this.southWest, this.northEast);

  public map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  public initMap(){
    if(!this.placesService.useLocation) throw Error("There is no placesService.useLocation")


    console.log(this.placesService.useLocation)

    this.map = L.map('map', {maxBounds: this.bounds})
      .setView([this.placesService.useLocation![1], this.placesService.useLocation![0],], 13,)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }


}
