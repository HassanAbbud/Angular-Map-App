import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services';
import { LatLngExpression } from 'leaflet';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider.js';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  public selectedId: string = "";

  get places(){
    return this.placesService.places
  }
  get isLoadingPlaces(){
    return this.placesService.isLoadingPlaces
  }

  flyTo(place: SearchResult) {

    this.selectedId = place.label
    const currentLatLng: LatLngExpression = [place.y, place.x];

    this.mapService.flyTo(currentLatLng)
  }
}
