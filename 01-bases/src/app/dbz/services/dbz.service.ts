import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/dbz.interface";

//decorador que le dice a la clase exportada Dbz que se va a poder inyectar
//la importamos y la incluimos dentro de providers en el module ts y se importa
//este servicio no se ejecuta hasta que alguien lo requiera
//ni siquiera ahora mismo está creada la primera instancia
//después de haberse creado, va a ser la misma instancia
@Injectable()

export class DbzService{

    //creo un arreglo de personajes de tipo Personaje que es un array con objetos dentro como ejemplos
    //la propiedad la hago privada para no ser manipulada además de indicarlo con _ así que luego al llamar al Dbzservice no me la encontrará en lista
    private _personajes:Personaje[] = [
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
      
    //para tener acceso a estos personajes privados _ hago un getter de tipo Personaje arreglo
    //uso el operador spread [...] para romper la referencia en JS con los personajes privados: separa cada uno de los elementos del arreglo y crea uno nuevo
    get personajes(): Personaje[]{
      return [...this._personajes];
    }
      
    constructor(){}

    agregarPersonajes(argumento: Personaje){
        this._personajes.push(argumento);
        //hacemos referencia a estos personajes privados donde queremos guardar al nuevo personaje
    }

}

/*
Orden de elementos en una clase
1-propiedades (privadas o públicas)
2-getters o setters
3-constructor que suele estar al final y que es el método especial de esa clase (es una función que se ejecuta automáticamente cuando se crea un objeto de una clase específica)
4-métodos (para añadir personajes, cambiarlos,etc...) que reciben argumentos de tipo

*/