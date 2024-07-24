import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if ( !navigator.geolocation ) {
  alert('Browser does not support Geolocation');
  throw new Error('Browser does not support Geolocation');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
