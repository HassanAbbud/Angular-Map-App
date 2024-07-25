import { Injectable } from '@angular/core';
import { PlacesResponse } from '../interfaces/places.interface';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  public useLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: SearchResult[] = [];

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

  setPlaces(query: SearchResult[]) {
    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if ( !this.useLocation ) throw Error('No hay userLocation');

    this.places = query
  }

}
