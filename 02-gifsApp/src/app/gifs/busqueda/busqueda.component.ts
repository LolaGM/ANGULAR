import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  //decorador @viewchild y dentro el nombre del elemento que queremos buscar: por elemento HTML o por referencia local especficada con #
  //ponemos un nombre a la propiedad de esta clase y le indicamos el tipo any de momento
  //le pasamos a esta propiedad el ! que es el NON NULL ASSERTION OPERATOR que asegura que este valor nunca será nulo
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  //importamos el servicio en este componente y así ya tenemos acceso a todas sus propiedades y métodos incluido el de agregar
  constructor(private gifsService:GifsService){ }

  buscar( ){
    
    const valor = this.txtBuscar.nativeElement.value;
    //console.log(valor);

    //hacemos la validación de valores nulos 
    if(valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor); //a este GIFS busco el valor

    //vamos a borrar lo escrito dentro del valor recibido indicandole que está vacío y así se borrará al presionar enter
    this.txtBuscar.nativeElement.value = '';

  }

}

//console.log(termino); 

//pasamos por pantalla esta propiedad txtBuscar que tenemos en la clase. Es de tipo nativeElement y de tipo ElementRef
//console.log(this.txtBuscar);

//usamos el ElementRef (que es de tipo genérico <T> con su propiedad nativeElement así que ya no tenemos que recibir el argumento del método buscar.
//el tipo del ElementRef es en este caso HTMLInputElement

/*
Para controlar las entradas vacías o repetidas podríamos hacerlo desde aquí en el servicio o en el componente de búsqueda directamente
*/

/*
Orden de elementos en una clase
1-propiedades (privadas o públicas)
2-getters o setters
3-constructor que suele estar al final y que es el método especial de esa clase (es una función que se ejecuta automáticamente cuando se crea un objeto de una clase específica)
4-métodos (para añadir elementos, cambiarlos,etc...) que reciben argumentos de algún tipo
*/