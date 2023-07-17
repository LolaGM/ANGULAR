//componente generado con schematics con opción skip selector
import { Component, computed, signal } from '@angular/core';

//las señales no tienen por qué estar dentro de componentes. Podemos tenerlas fuera en  una constante:
//const name = signal('Fernando');

//podríamos cambiar el valor de la señal con:
//name.set('Lola');

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  //creamos nuestra primera señal estableciendo el valor inicial en 10. Usando signals ANGULAR identifica donde se está usando
  public counter = signal(10);

  //propiedad con una señal computada de sólo lectura: retornamos valor y basados en ese valor,podemos tener referencia a otras señales y cuando esas señales cambian, el valor se va a volver a computar
  public squareCounter = computed( () => this.counter() * this.counter() )

  constructor(){
    //console.log(name()); //mostramos la señal de nuestra const
  }
  //método para incrementar en 1 o decrementar en 1 según el valor que le pasamos al método increaseBy
  increaseBy( value:number) {

    //accedemos a la propiedad y le aplicamos método update que necesita funcion de actualizacion que toma el actual y regresa el nuevo valor de la señal
    this.counter.update(current => current + value );

    //accedo a la señal contenida en la propiedad y le aplico método set  con parámetros propiedad más valor: esta es una forma de hacerlo:
    //    this.counter.set (this.counter() + value);
  }

}

/*
Podríamos usar el contador a la manera tradicional de
public counter:number = 10;
*/
