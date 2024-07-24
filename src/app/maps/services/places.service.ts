import { Injectable } from '@angular/core';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    this.getUserLocation()
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [ coords.latitude, coords.longitude ];
          resolve( this.useLocation );
        },
        ( err ) => {
          alert('Could not get Geolocation')
          console.log(err);
          reject();
        }
      );
    });

  }
}
