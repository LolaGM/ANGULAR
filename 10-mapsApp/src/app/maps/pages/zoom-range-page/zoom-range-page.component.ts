import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
//componente creado usando pages con skip selector porque no va a ser llamado en otra parte <maps-layout></maps-layout> y esta va a ser nuestra ruta padre

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})

//no olvidemos usar el OnDestroy para acabar los listerners del componente
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
  
  //podemos hacer la referencia a algún elemento HTML con: id, clase, componente entre () y a la propiedad le pasamos ? como opcional.,Lo cambiamos en la constante pero puede no encontrarse ese elemento HTML
  @ViewChild('map') divMap?: ElementRef;

  
  public zoom: number = 10;//el zoom por defecto trae 9 pero podemos cambiarlo y ahora en HTML indicamos zoom
  public map?: Map; //map ahora no le da valor y puede ser nulo en algún momento 
  public currentLngLat: LngLat = new LngLat(-73.99084027130951, 40.72196076153361);//creamos nuevo objeto lngLat para longitud latitud y le mando valor inicial de mapbox -74.5, 40 pero podríamos indicar uno en concreto


  ngAfterViewInit(): void {

    //console.log(this.divMap);
    
    //validamos si existe y lo retornamos sólo con return o que lance throw error 'Error'. Con esta condición nos aseguramos que divMap siempre tenga un valor así que eliminamos ?
    if ( !this.divMap) throw 'El elemento HTML no fue encontrado';

    //copiamos el código desde mapbox aquí y recordemos que por ID no es recomendable hacer la referencia de forma local con #map y usando ViewChild
    //convertimos la const map en this.map referenciando la propiedad de arriba
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // ya tengo propiedad que contiente -74.5, 40 como valor inicial pero podríamos establecer un lugar 
      zoom: 9, // starting zoom
      });
    
      //ahora llamamos a los listeners
      this.mapListeners();
  }

  //OnDestroy para limpiar los listeners del componente
  ngOnDestroy(): void {
    this.map?.remove();
  }

  //creamos 3 métodos LISTENERS:para escuchar si cambia el zoom en el objeto map que declaramos, o la latitud longitud. Los destruiremos cuando el componente ya no se use
  mapListeners(){
    //si no existe, lanza error
    if( !this.map) throw 'Mapa no inicializado';

    //si existe, escucharemos con on y un método en este caso zoom que dispara un evento.
    this.map.on('zoom', (event) =>{
        //console.log(event);
        this.zoom = this.map!.getZoom(); // Ahora actualicemos el zoom y le decimos que siempre va a tener un valor. Estamos actualizando el valor de 10 de zoom al que reciba por get y le decimos con ! que siempre va a tener un valor. 
    });

    //para no pasarnos a 22 en el zoom y quedarnos en el máximo real que es 18. Condicionamos a 18
    this.map.on('zoomend', (event) =>{

      //si este map que siempre tengo es menor a 18 que no haga nada
      if (this.map!.getZoom() < 18) return; 

      //si es mayor a 18, lo movemos a 18
      this.map!.zoomTo(18);
    });

    //listener para cuando se mueva el mapa
    this.map.on('move', () =>{
      this.currentLngLat = this.map!.getCenter(); // la propiedad cambiará el valor al valor que tenga el getCenter que es un objeto de tipo lat long. currentLngLat es ya un objeto y lo mostramos en HTML

      //console.log(this.currentLngLat); //mostramos por pantalla el valor que va cambiando
    });
  }

  //ahora damos función a cada botón y lo llamamos en html
  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  //método para cambiar el zoom en el input: recibe el valor
  zoomChanged( value: string){

      this.zoom = Number(value); //transformamos el valor a número
      this.map?.zoomTo(this.zoom);//zoomeamos al valor que tenga en ese momento la propiedad
  }


}
