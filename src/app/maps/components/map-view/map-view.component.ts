import { Component, inject, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit {
  private placesService = inject(PlacesService);

  ngOnInit(): void {
    console.log(this.placesService.useLocation)
  }
}
