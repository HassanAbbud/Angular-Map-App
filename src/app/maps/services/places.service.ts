import { Injectable } from '@angular/core';

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

  getPlacesByQuery(query: string) {
    throw new Error('Method not implemented.');
  }
}
