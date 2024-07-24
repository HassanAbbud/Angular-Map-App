import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { LatLngExpression } from 'leaflet';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  private latLng: LatLngExpression = {
    lat: this.placesService.useLocation![0],
    lng: this.placesService.useLocation![1]
  }

  goToMyLocation() {
    if ( !this.placesService.isUserLocationReady ) throw Error('No user loaction found');
    if ( !this.mapService.isMapReady ) throw Error('Map is not available');

    this.mapService.flyTo( this.latLng)
  }

}
