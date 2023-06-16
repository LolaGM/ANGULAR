import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Persona } from '../interface/persona';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
})
export class HijoComponent {

  mensajeHijo:string = 'Texto que el componente HIJO recibe del padre';
  
  mensajeHijoPadre:string = 'Texto que el componente HIJO envía al padre';

  //INPUT para recibir el hijo los datos del padre.
  //se trata de un objeto vacío 
  @Input() datosHijo: Persona = {
    nombre: '',
    empresa: '',
    antiguedad: 0
  };

  //objeto con datos para enviar al padre 
  datosHijoPadre: Persona = {
    nombre: 'Giovanni',
    empresa: 'Bosonit',
    antiguedad: 2
  };
  
  constructor() { }

  //OUTPUT para enviar al padre un evento de tipo string (un mensaje)
  @Output() paraPadre = new EventEmitter<string>();

  //función que creamos para enviar al padre este evento usando el método emit y como parámetro el string
  enviarMensajePadre(){
    this.paraPadre.emit(this.mensajeHijoPadre)
  }

  //OUTPUT para enviar al padre un evento de tipo Persona
  @Output() objetoParaPadre = new EventEmitter<Persona>();

  //función que creamos para enviar al padre este evento usando el método emit y como parámetro el objeto
  enviarObjetoPadre(){
    this.objetoParaPadre.emit(this.datosHijoPadre)
  }
}