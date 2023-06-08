import { Component } from '@angular/core';

interface Personaje {
    nombre: string;
    poder: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})

export class MainPageComponent {
    //creo un arreglo de personajes de tipo Personaje que es un array con objetos dentro como ejemplos
    personajes:Personaje[] = [
      { 
        nombre: 'Goku',
        poder: 15000
      },
      { 
        nombre: 'Vegeta',
        poder: 8500
      },
      { 
        nombre: 'Krillin',
        poder: 700
      }
    ];

    //creo un objeto vacío que luego podría necesitar así que creo una interface para ponerle el tipo Personaje
    nuevo: Personaje = {
      nombre: '',
      poder: 0
    }

    agregar(){ 
      if(this.nuevo.nombre.trim().length === 0){
        return;
      }
      console.log(this.nuevo);//hacemos que imprima por consola este nuevo objeto llamado que es de tipo Personaje
    
      this.personajes.push(this.nuevo);//TAREA: insertar al arreglo del tipo personaje el nuevo personaje
      this.nuevo = {
        nombre: '',
        poder: 0
      }
    }
}

/*
hacemos una validación con if (aunque adelante veremos validaciones automáticas de ANGULAR) y preguntamos:
si el nombre no tiene nada siendo igual a 0, borramos espacios en blanco con trim y medimos la cantidad de caracteres que tiene retornando y saliendo del if
Podríamos validar el cero también pero en este caso lo dejaremos así.
----------------------------------------------------------------
cambiarNombre(event:any){
      console.log(event); 
      }
dentro de la consola con sólo poner event vemos todos los metodos de input y en target vamos a la propiedad value y vemos el valor */