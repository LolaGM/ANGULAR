import { Component } from '@angular/core';
//import { Personaje } from '../interfaces/dbz.interface';
//import {Input} from '@angular/core';

import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
})
export class PersonajesComponent {
  
  //@Input() personajes: Personaje[] = []; //necesito recibirlos como un Input() desdel el padre

  //creo un getter que accederá a los personajes creados en el getter con [...]
  get personajes(){
    return this.dbzService.personajes;
  }



  constructor(private dbzService: DbzService){
      //console.log("Servicio inicializado");
  }

}

/*para heredar padre hijo se usa un decorador @Input que importamos y con el que le decimos que los personajes van a venir del componente padre main y se suele escribir en una sóla linea de código: en el HTML del padre dentro de la llamada al componente app introducimos [personajes]="personajes" que es como llamar a la propiedad [].
Podría llamarlo de otra manera poniendo entre paréntesis del Input la palabra ('palabra')y usarla luego en el app [palabra]
*/

//para el tipado de personajes, en vez de tipado any haremos un tipado interface creando carpeta y dentro metiendo dbz.interface.ts que luego en JS no existirán por ser proias de TS
