import { Component, signal } from '@angular/core';

//creamos interface para el menú y sus elementos
interface MenuItem {
  title:string;
  route:string;
}


@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent {

  //usaremos signals para el menu item: las señales se pueden crear de varias formas: Si cambio el valor () de la señal, número o string o el que sea, sabe qué valor es. En este caso un arreglo de tipo MenuItem y dentro como teníamos antes el menú
  public menuItems = signal<MenuItem[]>([
    {
      title: 'Counter', route: 'counter'
    },
    {
      title: 'User', route: 'user-info'
    },
    {
      title: 'Mutations', route: 'properties'
    },
  ]);
}

//propiedad creada a la manera tradicional que contiene elementos del menú como arreglo: título aparece en la vista y route es el nombre que el indicamos en el routing module

  /* public menuItems: MenuItem[] = [
    {
      title: 'Contador', route: 'counter'
    },
    {
      title: 'Usuario', route: 'user-info'
    },
    {
      title: 'Mutaciones', route: 'properties'
    },
    
  ] */
