//import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SidemenuComponent } from '../../components/side-menu/side-menu.component';

//stand alone component creado con schematics tickando standalone.
//Son componentes que son "independientes" y pueden estar por sí mismos, sin usar módulos
//eliminamos el selector: cargaremos en la pagina principal por lazy load. Creamos en app routing el path
//standalone está en true lo que demuestra que es un componente independiente
//la línea imports: [CommonModule] : es el que permite usar directivas Angular: ngIf, ngFor,etc...
//hemos incluido el componente counter en el imports 

@Component({
  standalone: true,
  imports: [CounterAloneComponent, SidemenuComponent], //importamos el menú standalone para poder verlo
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

  //podemos hacer también inyección de dependencias 
  constructor(){}

}
