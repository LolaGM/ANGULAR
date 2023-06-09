import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})

export class MainPageComponent {
    
  //personajes: Personaje[] = [];

    //defino el nuevo de tipo Personaje
    nuevo: Personaje = {
      nombre: 'Maestro Roshi',
      poder: 1000
    }

    constructor( private dbzService: DbzService){
      //this.personajes = this.dbzService.personajes;
    }
    //constructor de la clase con las propiedades privadas de la clase dbzService de tipo DbzService que se importa.Esto es una inyección de dependencias
}

/*
hacemos una validación con if (aunque adelante veremos validaciones automáticas de ANGULAR) y preguntamos:
si el nombre no tiene nada siendo igual a 0, borramos espacios en blanco con trim y medimos la cantidad de caracteres que tiene retornando y saliendo del if
Podríamos validar el cero también pero en este caso lo dejaremos así.
----------------------------------------------------------------
Agregar nuevo personaje
console.log(argumento);
      console.log('Main Page Component');
      si se muestra el objeto Roshi y el mensaje Main es que se disparó el componente hijo, lo recibió el padre y lo interpretó.¿Cómo recibo esta información mutada en el padre? Con $event en el app y aquí pasando un arg de tipo Personaje que muestro con console
      Una vez que por consola se ve,ya podemos usar el push para añadir este argumento al final del array personajes que ya contenía personajes
--------------------------------------------------
Crear un getter en vez de usar el service con el objeto personajes dentro del constructor
se llama igual y será un arreglo de Personajes que retorna el dbzService para
    get personajes():Personaje[]{
        return this.dbzService.personajes;
se sigue viendo en el HTML la propiedad personajes

------------------------------------------------
cambiarNombre(event:any){
      console.log(event); 
      }
dentro de la consola con sólo poner event vemos todos los metodos de input y en target vamos a la propiedad value y vemos el valor */
/*
 debugger; //instruccion de JS que interpreta el navegador para hacer la depuración y que aquí se pause el código como un breakpoint
mejor usar VSC con F5 y ver el archivo launch.json generado. Pondremos el numero de puerto en el archivo generado
*/