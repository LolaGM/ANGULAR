import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent {  

  //creo un objeto vacío que luego podría necesitar así que creo una interface para ponerle el tipo Personaje que está importada arriba y que recibo como Input()
  @Input() nuevo: Personaje = {
    nombre: '',
    poder: 0
  }

  constructor(private dbzService:DbzService){
  }
  //para transmitir del hijo al padre usamos este Output que srive para emitr eventos simplemente importándolo.
  //podemos ponerle también un alias entre ('') o simplemente usar el objeto que vamos a crear (se suele poner on delante)
  //este obejto es de tipo especial llamado EventEmitter que necesita saber el tipo de dato que se va a enviar:puede ser un genérico <T> de tipo any, aunque en este caso no será <string> sino un interface <Personaje>. Este mismo tipo que usemos se puede añadir tambien al new EventEmitter
  //@Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();

  agregar(){ 
    if(this.nuevo.nombre.trim().length === 0){
      return;
    }
    //console.log(this.nuevo);//hacemos que imprima por consola este nuevo objeto llamado que es de tipo Personaje
    
    //usamos la propiedad creada y le pasamos el método emit cuando ya tenemos preparado el Output. Como parámetro - que es opcional? - tendra el objeto nuevo pero tiene que ser del tipo establecido <Personaje>
    //this.onNuevoPersonaje.emit(this.nuevo);
    this.dbzService.agregarPersonajes(this.nuevo);
  
    this.nuevo = {
      nombre: '',
      poder: 0
    }
  }  
}

/*
this.personajes.push(this.nuevo);
TAREA: insertar al arreglo del tipo personaje el nuevo personaje
Para ello había arriba un 
@Input() personajes: Personaje[] = []; //necesito recibirlos como un Input() desdel el padre

 */
