import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import * as L from 'leaflet'
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService)

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

    this.map = L.map('map', {maxBounds: this.bounds, zoomControl: false})
      .setView([this.placesService.useLocation![0], this.placesService.useLocation![1],], 16)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const popup = new L.Popup()
      .setContent(`
        <h6>I am here</h6>
        <span>Im in this place of the world</span>
      `);

    new L.Marker(this.placesService.useLocation)
      .bindPopup( popup )
      .addTo( this.map )

    this.map.addControl(L.control.zoom({ position: 'bottomleft' }));

    this.mapService.setMap( this.map );
  }


}
