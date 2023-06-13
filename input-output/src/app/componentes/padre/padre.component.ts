import { Component } from '@angular/core';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
})
export class PadreComponent {
  dataPadre = "Mensaje escrito en el componente PADRE que recibirá el hijo";

  arregloColores:string[] = ["verde", "amarillo", "rojo"];

  //método para agregar datos al array
  agregarDatosArreglo(nuevosValores:string){
    this.arregloColores.push(nuevosValores);
  }
}
