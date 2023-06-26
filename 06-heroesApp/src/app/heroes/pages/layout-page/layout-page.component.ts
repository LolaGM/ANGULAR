import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list' //url definidos en los routing
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new-hero' //url definidos en los routing
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search' //url definidos en los routing
    },
  ];
}
