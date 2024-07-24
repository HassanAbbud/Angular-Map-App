import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
import { MapViewComponent } from '../map-view/map-view.component';
import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);
  private debounceTimer?: NodeJS.Timeout;


  async onQueryChanged( query: string = '' ) {

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query });

    this.debounceTimer = setTimeout(() => {
      console.log(results)
    }, 350 );

  }
}
