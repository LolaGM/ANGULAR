import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  
    transform(heroes: Hero[], sortBy?: keyof Hero | ''): Hero[] {
    
        switch (sortBy) {
          case 'name': return heroes.sort( (a,b) => (a.name > b.name ? 1 : -1 ));

          case 'canFly': return heroes.sort( (a,b) => (a.canFly > b.canFly ? 1 : -1 ));

          case 'color': return heroes.sort( (a,b) => (a.color > b.color ? 1 : -1 ));

          default: return heroes;
          
    }
  }
}

/*
Al haberlo generado con schematics, ya se ha importado en products module.

-Recibe un valor que es un arreglo de tipo Hero[] que contiene el objeto con propiedades name, canfly y color

-El valor del argumento es :por cuál criterio voy a ordenar: sortBy

-Podría ordenarlo por algo en concreto de las propiedades del objeto Heroes como por ejemplo sortBy === 'canFly' pero en este caso no vamos a especificar criterio y daremos la opción a keyof de vacío '' y daremos valor de retorno el objeto Hero.

Usamos para esto un SWITCH de JS para cada caso.
Si entra en name =>  que retorne con el método de arreglos SORT (ver doc oficial

En caso de no elegir criterio, por defecto que retorne los heroes.

Haremos opcional ? el valor del sortBY 

Ahora aplicamos el pipe al valor de heroes en html y le pasamos los argumentos

*/