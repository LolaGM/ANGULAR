import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
})
export class HijoComponent {
  @Input() 
  data:string = 'Mensaje escrito en el componente HIJO';

  @Output()
  eventoEnviarData = new EventEmitter<string>();
  //nueva instancia de la clase EventEmitter de tipo string

  //método que se ejecuta al pulsar el botón
  enviarData(valor:string){
    this.eventoEnviarData.emit(valor);
  }
}
