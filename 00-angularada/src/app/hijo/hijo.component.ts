import { Component, Input } from '@angular/core';
import { Persona } from '../interface/persona';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
})
export class HijoComponent {

  mensajeHijo:string = 'Texto que el componente HIJO recibe del padre';
  
  mensajeHijoPadre:string = 'Texto que el componente HIJO envía al padre';

  datosHijoPadre: Persona = {
    nombre: 'Giovanni',
    empresa: 'Bosonit',
    antiguedad: 2
  };

  @Input() datosHijo: Persona = {
    nombre: '',
    empresa: '',
    antiguedad: 0
  };

  constructor() { }
}
