import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card', //cambiamos el nombre del selector al nombre del módulo
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css' ],
})
export class CardComponent implements OnInit {   //implementamos una validación al inicio

  //usamos Input y lo importamos para recibir un hero del componente padre
  @Input() 
  public hero!:Hero; //indicamos que siempre va a aparecer con !

  ngOnInit(): void { //validamos al inicio que si !no existe lance error
    if ( !this.hero ) throw Error('Hero property is required');
  }

}
