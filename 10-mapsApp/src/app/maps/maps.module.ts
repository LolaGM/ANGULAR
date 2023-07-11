import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//desde mapbox copiamos su CDN en el html y además importamos con esta línea añadiendo * as
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

//si no la reconoce, entonces en terminal ejecutamos: npm i --save-dev @types/mapbox-gl

//ahora copiamos el acces token de sólo lectura y le añadimos () y dentro as any
(mapboxgl as any).accessToken = 'pk.eyJ1IjoibG9sYWdtIiwiYSI6ImNsank3YnM0NDAxcm0zZmxoeGx2bjEzM3EifQ.oOL42L6vei3P6fkTcShIDw';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { SidemenuComponent } from './components/side-menu/side-menu.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    SidemenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
