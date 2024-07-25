import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  private placesService = inject(PlacesService);

  get places(){
    return this.placesService.places
  }
  get isLoadingPlaces(){
    return this.placesService.isLoadingPlaces
  }
}
