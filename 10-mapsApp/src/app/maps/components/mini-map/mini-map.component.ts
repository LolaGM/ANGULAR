import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Map, Marker } from 'mapbox-gl'; //importamos map y marker

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef; //copiamos el viewChild el contenido

  ngAfterViewInit(): void {

    //verificamos si lo recibimos
    if ( !this.divMap?.nativeElement ) throw 'Map Div no encontrado';
    if ( !this.lngLat) throw 'LngLat no puede ser nulo';
    
    //mapa que copiamos de otros componentes pages y configuramos al gusto
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // ya tengo propiedad que contiente -74.5, 40 como valor inicial pero podríamos establecer un lugar 
      zoom: 15, // zoom grande
      interactive: false //para que no se pueda hacer scroll en mapa y parezcan imágenes
      });

    //marker
    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map );
  }

}
