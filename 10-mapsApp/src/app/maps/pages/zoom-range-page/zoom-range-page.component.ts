import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
//componente creado usando pages con skip selector porque no va a ser llamado en otra parte <maps-layout></maps-layout> y esta va a ser nuestra ruta padre

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit{

  //podemos hacer la referencia a algún elemento HTML con: id, clase, componente entre () y a la propiedad le pasamos ? como opcional.,Lo cambiamos en la constante pero puede no encontrarse ese elemento HTML
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {

    //console.log(this.divMap);
    
    //validamos si existe y lo retornamos sólo con return o que lance throw error 'Error'. Con esta condición nos aseguramos que divMap siempre tenga un valor así que eliminamos ?
    if ( !this.divMap) throw 'El elemento HTML no fue encontrado';

    //copiamos el código desde mapbox aquí y recordemos que por ID no es recomendable hacer la referencia de forma local con #map y usando ViewChild
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });
    
  }

}
