import { Injectable } from '@angular/core';


//tenemos esta propiedad dentro del decorador que le indica a ANGULAR que no importa en qué parte de su aplicación esté. Este servicio evita que tengamos que espeficar en los providers del gifsmodule y así lo tengamos a nivel global de TODA LA APP 
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  //guardamos aquí la clave de la app Giphy: docs>Api>search endpoint al que le añadiremos por delante y por detrás https://api.giphy.com/v1/gifs/search?api_key=MM8a416GOKm03wLz7W0tuPWnXuINZqL1&q=dragon ball z&limit=10
  private apiKey:string = 'MM8a416GOKm03wLz7W0tuPWnXuINZqL1';

  //como queremos almacenar el valor entrante por el input como parte del menú, vamos a crear una propiedad _privada para almacenar esos strings y luego mostrarlos en el sidebar: un array inicializado vació.
  private _historial: string[] = [];

  //accederemos a esa propiedad con getter rompiendo la relación con [...] aunque funciona sin ello también
  get historial(){
    
      return [...this._historial];
  }

  //ahora insertamos valores a esa propiedad vacía que recibirá el termino o query yharemos que se inserte al principio de ese array y qye en el componente llamaremos
  buscarGifs( query:string = "" ){
    //para no guardar repetidos con mínúscula o mayusc que no tengan espacios delante o detras con trim y que sean en minuscular
    query = query.trim().toLowerCase();


    //Para comprobar que no hay repetidos validamos si este historial privado NO incluye el valor query. Es decir, si no lo incluye, lo insertamos en el arreglo y hacemos el corte a 10
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); 
    }
   

    //comprobamos que se esté grabando con console
    console.log(this._historial);
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
*/
