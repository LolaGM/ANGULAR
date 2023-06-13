import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

//tenemos esta propiedad dentro del decorador que le indica a ANGULAR que no importa en qué parte de su aplicación esté. Este servicio evita que tengamos que espeficar en los providers del gifsmodule y así lo tengamos a nivel global de TODA LA APP 
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  //guardamos aquí la clave de la app Giphy: docs>Api>search endpoint al que le añadiremos por delante y por detrás https://api.giphy.com/v1/gifs/search?api_key=MM8a416GOKm03wLz7W0tuPWnXuINZqL1&q=dragon ball z&limit=10
  private apiKey:string = 'MM8a416GOKm03wLz7W0tuPWnXuINZqL1';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs'; //servicio URL

  //como queremos almacenar el valor entrante por el input como parte del menú, vamos a crear una propiedad _privada para almacenar esos strings y luego mostrarlos en el sidebar: un array inicializado vació.
  private _historial: string[] = [];

  //creamos un lugar público donde almacenar la data recibida por resp: array vacío de tipo any de momento hasta cambiarlo por el tipado correcto creado de la interface Gif
  public resultados:Gif[] = [];

  //accederemos a esa propiedad con getter rompiendo la relación con [...] aunque funciona sin ello también
  get historial(){    
      return [...this._historial];
  }

  //constructor con propiedad privada http y tipo HttpClient que importamos y que debajo llamaremos dentro del método buscarGif
  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //una vez guardados en local storage los resultados, los muestro
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  
    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }

  //ahora insertamos valores a esa propiedad vacía que recibirá el termino o query y haremos que se inserte al principio de ese array y qye en el componente llamaremos
  buscarGifs( query:string = "" ){

      //para no guardar repetidos con mínúscula o mayusc que no tengan espacios delante o detras con trim y que sean en minuscular
      query = query.trim().toLowerCase();

      //Para comprobar que no hay repetidos validamos si este historial privado NO incluye el valor query. Es decir, si no lo incluye, lo insertamos en el arreglo y hacemos el corte a 10
      if(!this._historial.includes(query)){
        this._historial.unshift(query); //coloca al principio del array la busqueda
        this._historial = this._historial.splice(0,10); 
        //para almacenar las búsquedas hechas en memoria pero no las imágenees
        localStorage.setItem('historial', JSON.stringify( this._historial )  );
      }

      //queremos tener los QUERY params de POSTMAN para esta API disponibles  así que usamos el objeto HttpParams que importamos seguido del método set con sus pares de valores: primero apiKey y la clave de la API

      const params = new HttpParams()
        .set('apiKey', this.apiKey)
        .set('limit', '10') //10 lo ponemos como string el numero para no usar el método toString al number
        .set('q', query); //query que estoy recibiendo como argumento

      console.log(params.toString()); //convierte a string la constante

      //llamamos a la propiedad creada http con petición GET + URL que necesito seguido del método SUBSCRIBE (parecido al THEN) en el que tendríamos una respuesta de la que hacemos impresión de consola. Y de esa respuesta sólo me interesa la data por lo que pongo de tipo any o el tipado específico.
      //Usaremos backticks `` para la dirección para así poder usar la interpolación de strings {} dentro de ella y así mandar la busqueda usando query: recibiré lo que mande por petición
      //almacenamos la data recibida en algún lugar público dentro del service
      //después de haber convertido el código de la api en la app de quiclktype a código TS, creamos interface cambiando DATUM por el nombre elegido GIF y aquí lo especificamos como tipo del get y del resp
      //ahora queremos que esas búsquedas puedan recuperarse pinchando en el sidebar
        this.http.get<SearchGifsResponse>(`${this.apiUrl}/search`,{params})
          .subscribe((resp) => {
            this.resultados = resp.data; //en el componente resultados 
            localStorage.setItem('resultados', JSON.stringify( this.resultados )  );
            //para almacenar las búsquedas hechas en memoria cuando tenga la respuesta
        localStorage.setItem('resultados', JSON.stringify( this.resultados )  );

          })      

      //comprobamos que se esté grabando con console
      //console.log(this._historial);
      }
}

/*
Para controlar las entradas vacías o repetidas podríamos hacerlo desde aquí en el servicio o en el componente de búsqueda directamente
hacemos la validación de valores nulos:
if(valor.trim().length === 0){
      return;
}
podríamos hacer que en conseguir historial, no entrasen más valores que 10 a esta propiedad privada de historial: (lo pegamos en el método buscar en el servicio) pero esto no hace que se mantengan los 10 valores
this._historial = this._historial.splice(0,10); 

Para comprobar que no hay repetidos validamos si este historial privado NO incluye el valor query. Es decir, si no lo incluye, lo insertamos en el arreglo y lo cortamos a 10:
if(!this._historial.includes(query){
  this._historial.unshift(query);
  this._historial = this._historial.splice(0,10)
}

<<<<<<<<<<<<<<<<<
Llamada a la API con FETCH: método fetch con parámetro de la API  para petición y respuesta al servidor que  usa dos métodos: then y catch con una función cada uno en la que llamamos al método JSON. Este JSON devuelve otra promesa THEN con los datos por consola si es correcto
fetch('https://api.giphy.com/v1/gifs/search?api_key=MM8a416GOKm03wLz7W0tuPWnXuINZqL1&q=dragon ball z&limit=10')
  .then( resp => {
    resp.json().then(data =>{
      console.log(data);
    })
})

this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=MM8a416GOKm03wLz7W0tuPWnXuINZqL1&q=${ query }&limit=10`)

En ANGULAR usaremos el common llamado HttpClientModule añadiendolo al app.module.
Añado un constructor.

*/
