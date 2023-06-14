import { Component } from '@angular/core';
import { Persona } from './interface/persona';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularada';

  mensajePadre:string = 'Este es el mensaje del componente PADRE que tenemos en el archivo app.component.ts ';

  datosPadre: Persona = {
    nombre: 'Lola',
    empresa: 'Bosonit',
    antiguedad: 1
  };
  
}