import { inject, Injectable } from '@angular/core';
import { PlacesResponse } from '../interfaces/places.interface';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private mapService = inject(MapService);

  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: SearchResult[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation()
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [ coords.latitude, coords.longitude ];
          resolve( this.userLocation );
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

    if ( !this.userLocation ) throw Error('No hay userLocation');

    this.places = query
    this.mapService.createMarkersFromPlaces(this.places, this.userLocation);

  }

}
