import { Pipe, PipeTransform } from '@angular/core';
//pipeTransform es el método que se llamará para hacer la transformación visual de los datos


@Pipe({
    name: 'toggleCase' //nombre que usaremos en el HTML para llamar al pipe
})

export class ToggleCasePipe implements PipeTransform {
    transform(value: string, toUpper: boolean = false ): string{
        
        //console.log({value});//para mostrar por consola el objeto con su valor actual de true
        return (toUpper)
            ? value.toUpperCase()
            : value.toLowerCase();
    }
    
}
/*
-declaramos ese pipe en el modulo products
-en este caso concreto regresamos el valor de tipo string pero podría ser un arreglo filtrado o cualquier cosa
-vamos a hacer que  retorne (si es verdadero) 
    -lo pase a mayusc
    -si es falso a minusc
*/

/* return value.toUpperCase(); 
en este caso nuestro pipe SÓLO retorna el valor dado a mayúsculas */