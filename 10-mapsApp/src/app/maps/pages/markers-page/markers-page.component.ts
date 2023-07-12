import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

//creamos interface para poder asociar el color del marcador con el nombre
interface MarkerAndColor {
  color: string;
  marker: Marker;
}

//creamos interface para sacar los datos que me interesa del objeto marker: color y latitud 
interface PlainMarker {
  color: string;
  lngLat: number[]; //(number por ser coordinadas) valdría tambien: [number, number]
}

//este componente ha sido creado usando pages con skip selector porque no va a ser llamado en otra parte <maps-layout></maps-layout> y esta va a ser nuestra ruta padre

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

   //podemos hacer la referencia a algún elemento HTML con: id, clase, componente entre () y a la propiedad le pasamos ? como opcional.,Lo cambiamos en la constante pero puede no encontrarse ese elemento HTML
    @ViewChild('map') divMap?: ElementRef;
  
    //guardar los marcadores buscados que es un arreglo que empieza vacío y donde se almacenarán los creados en el método. Los listaremos con ngFor indicando color y marcador
    public markers: MarkerAndColor[] = [];

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
        zoom: 13 // starting zoom
        });

      //aquí podríamos ya tener marcadores listos así que llamamos a la función
      this.readFromLocalStorage();
  }

  //creamos un par de métodos para añadir marcadores sin importar cómo lo genere

  //1º mandamos longitud y latitud que será luego añadida en método 2º y llamado en button
  createMarker(): void {

    //verifico si existe el mapa
    if ( !this.map) return;

    //creamos color hex de manera aleatoria
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    //longitud y latitud que se obtiene del centro del mapa
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color); //método 2º al que le pasamos las 2 const creadas con la data de ese momento
  }

  //2º añadir marcador recibiendo lnglat y un color para diferenciarlos
  addMarker( lngLat: LngLat, color: string){

    //verifico si no existe el mapa, no hago nada
    if ( !this.map) return;

    //si existe, creamos marcador del color que establezcamos
    const marker = new Marker({
       color: color, // propiedad color del color que recibamos 
       draggable: true //propiedad de movilidad de ese marcador
    })
      .setLngLat(lngLat) // establecer long lat
      .addTo(this.map); // añadir a este mapa

    //guardar marcadores en el arreglo markers cada vez que añado 1 que contendrá el color y el marcador
    this.markers.push({
      color, //es igual a tener color: color
      marker,  //es igual a tener marker: marker
    })

    //llamamos al método que guarda el marcador cuando lo pulsamos
    this.saveToLocalStorage();

    //guardar la posición del marcador en local storage: cada vez que pulso un marcador, que haya un listener. Como los marcadores pasan por referencia,y tendremos ese valor
    marker.on('dragend', () => this.saveToLocalStorage());

      //console.log(marker.getLngLat());
  }

  //borrar marcadores haciendo doble click y recibiendo posición del arreglo markers
  deleteMarker(index: number) {

    this.markers[index].marker.remove();  //eliminamos marcador del mapa
    this.markers.splice(index,1);//eliminamos marcador del arreglo según posición y 1 sólo
  }

  //método creado (y propio de mapbox) para dirigirse al marcador cuando lo pulsamos y centrarlo en pantalla: recibimos un marcador
  flyTo( marker: Marker ) {

    //si existe el mapa, voy a navegar ahí
    this.map?.flyTo({
      zoom: 14, //nivel de zoom que quiero (18 es el máximo)
      center: marker.getLngLat() //donde quiero centrar el mapa: el marker que recibo como arg
    })
  }

  //métodos para almacenar marcadores y el proceso inverso de leer

  saveToLocalStorage() { //local storage sólo graba strings usando Jsonstringify + solo grabaremos la información que me interesa: creamos otra interface

    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker}) => {
      
      return {
          color, // color: color
          lngLat: marker.getLngLat().toArray(),
      }

    }); //para convertirlos uso map JS y dentro uso desestructuración. Regresamos un un objeto con color y latitude

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
    //localStorage no se importa. Aplicamos método setItem para guardar y le pasamos todos los marcadores simplificados con los datos de color y coordenadas, pasando a JSON ese mismo objeto con los marcadores. Ya tenemos los plainM ahora toca reconstruirlos

    //console.log(plainMarkers); // para ver el objeto con su color y coordenadas
    //console.log(this.markers); //llamamos a nuestro objeto de marcadores
  }

  readFromLocalStorage() { //una vez inicializado el mapa, llamamos al método read

    //creamos const para contener el método getItem, y si no existe, ?? o es nulo, regreso string vacío. Local storage retorna un string siempre
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';

    //recontruimos con Json Parse los marcadores que son ahora un string
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! OJO

    //console.log(plainMarkers);

    //llamamos a la instrucción que los pone en el mapa (tras haberlos guardado en local) usando un foreach para cada uno de ellos
    plainMarkers.forEach( ({ color, lngLat }) => { //plainMarkers.forEach ( plainMarker => { también valdría pero desestructuramos
        
        const [ lng, lat ] = lngLat; //hemos creado dos variables 
        const coords = new LngLat( lngLat[0], lngLat[1]); //desestructuramos arriba estos argumentos

        this.addMarker(coords, color); //este método add está esperando entre sus argumentos un color y un objeto que vamos a crear en const
    })


  }


}

/*

-->si queremos cambiar TODO el elemento HTML: creamos un elemento HTML

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'marcador en texto'

  -->creamos un marcador con clase Marker con propiedades de establecer y luego añadir al mapa
  -->podemos cambiarle el color si usamos colores HTML válidos o hexadecimales o añadir texto

    const marker = new Marker({
      color: 'red'
      element : markerHtml
    })
        .setLngLat(this.currentLngLat)
        .addTo(this.map) ;

*/
