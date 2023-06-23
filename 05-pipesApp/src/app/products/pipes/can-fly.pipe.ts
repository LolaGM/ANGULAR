import { Pipe, PipeTransform } from '@angular/core';
//pipeTransform es el método que se llamará para hacer la transformación visual de los datos


@Pipe({
    name: 'canFly' //nombre que usaremos en el HTML para llamar al pipe
})

export class CanFlyPipe implements PipeTransform {
    transform(value: boolean): 'vuela' | 'no vuela' { 
        
        return value
        ?  'vuela'
        :  'no vuela';
    }    
}
/*
-declaramos este pipe en el modulo products
-en este caso concreto regresamos el valor de tipo BOOLEAN con las opciones
-vamos a hacer que  retorne el valor
    -si es verdadero el texto 'vuela'
    -si es falso el texto 'no vuela'
*/

/* return value.toUpperCase(); 
en este caso nuestro pipe SÓLO retorna el valor dado a mayúsculas */