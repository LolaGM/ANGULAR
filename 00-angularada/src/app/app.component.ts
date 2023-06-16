import { Component } from '@angular/core';
import { Persona } from './interface/persona';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angularada';

  //mensaje del padre mostrado por interpolacion {{}} en el propio padre
  mensajePadre:string = 'Este es el mensaje del componente PADRE que tenemos en el archivo app.component.ts ';

  //mensaje  vacío que rellenaremos en el padre con datos recibidos del hijo  al hacer click 
  mensajeRecibido:string = '';

  //objeto vacío que rellenaremos  en el padre con datos recibidos del hijo al hacer click 
  objetoRecibido:Persona = {
    nombre: '',
    empresa: '',
    antiguedad: 0
  };

  //objeto que el padre pasará al hijo
  datosPadre: Persona = {
    nombre: 'Lola',
    empresa: 'Bosonit',
    antiguedad: 1
  };

  constructor(){    }  

  //función para que el padre reciba mensaje string de parte del hijo
  recibirMensaje(evento:string){
    console.log(evento);
    this.mensajeRecibido = evento;
  } 

  //función para que el padre reciba objeto Persona de parte del hijo
  recibirObjeto(evento:Persona){
    console.log(evento);
    this.objetoRecibido = evento;
  } 
  
}