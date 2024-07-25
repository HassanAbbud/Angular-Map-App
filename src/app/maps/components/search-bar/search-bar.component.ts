import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private placesService = inject(PlacesService);
  private debounceTimer?: NodeJS.Timeout;


  onQueryChanged( query: string = '' ) {

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.placesService.isLoadingPlaces = true

    this.debounceTimer = setTimeout(async () => {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query });
      this.placesService.isLoadingPlaces = false;
      this.placesService.setPlaces(results);
    }, 350 );

  }
}
