import { Component } from '@angular/core';

//creamos una interface para el Menu
interface MenuItem {
  name: string;
  route: string;

}


@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SidemenuComponent {

  //creamos ahora las 4 rutas correspondientes creadas en el maps-routing
  public menuItems: MenuItem[] = [
      
    { route: '/maps/fullscreen', name: 'Fullscreen' },
    { route: '/maps/zoom-range', name: 'Zoom-Range' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Houses' },
  ]

}
