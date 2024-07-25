import { Injectable } from '@angular/core';
import * as L from 'leaflet'
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';

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

  createMarkersFromPlaces( places: SearchResult[], userLocation: [number, number] ) {

    if ( !this.map ) throw Error('Map not initialized');


    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    for (const place of places) {
      const center: L.LatLngExpression = [place.y, place.x];
      const popup = new L.Popup()
        .setContent(`
          <h6>${ place.label.split(' ')[0] }</h6>
          <span>${ place.label }</span>
        `);

      const newMarker = new L.Marker(center)
        .bindPopup( popup )
        .addTo( this.map );

      newMarkers.push( newMarker );
    }

    this.markers = newMarkers;

    if( places.length === 0 ) return;

    // Limites del mapa
    const bounds = new L.LatLngBounds([]);
    newMarkers.forEach( marker => bounds.extend( marker.getLatLng() ) );
    bounds.extend( userLocation );

    this.map.fitBounds(bounds, {
      padding: [200, 0]
    })

  }


}
