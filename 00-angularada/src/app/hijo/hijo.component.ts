import { Component, Input } from '@angular/core';
import { Persona } from '../interface/persona';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
})
export class HijoComponent {

  mensajeHijo:string = 'Datos que el componente HIJO recibe del padre';

  @Input() datosHijo: Persona = {
    nombre: '',
    empresa: '',
    antiguedad: 0
  };

  constructor() { }
}
