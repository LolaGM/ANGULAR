import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

//stand alone component creado con schematics tickando standalone.
//recordemos que este componente no está importado, así que para acceder a verlo, cuando tengamos una dependencia, lo tomamos



@Component({
  selector: 'counter-alone', //borramos app
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css']
})
export class CounterAloneComponent {

    //este counter va a poder ser recibido usando Input y puedo mandar cualquier valor al counter desde el padre
    @Input()
    public counter: number = 10;
}
