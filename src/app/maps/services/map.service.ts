import { Injectable } from '@angular/core';
import * as L from 'leaflet'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: L.Map;
  private markers: L.Marker[] = []

  get isMapReady(){
    return !!this.map;
  }
  constructor() { }

  setMap( map: L.Map ) {
    this.map = map;
  }

  get mapInstance(){
    return this.map;
  }
  flyTo( coords: L.LatLngExpression ) {
    if ( !this.isMapReady ) throw Error('Map is not initialized');

    this.map?.flyTo(coords, 14,);

  }

}
