import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

//creamos una interface para el Menu
interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true, // convierto el sidemenu en standalone component indicando true
  imports: [RouterModule, CommonModule], // para usar las rutas y las directivas ng importamos
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SidemenuComponent {

  //creamos ahora las 4 rutas correspondientes creadas en el maps-routing: route ruta del componente y name el nombre que aparece en pantalla
  public menuItems: MenuItem[] = [
      
    { route: '/maps/fullscreen', name: 'Fullscreen' },
    { route: '/maps/zoom-range', name: 'Zoom-Range' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Houses' },
    { route: '/alone', name: 'Stand Alone' }, // añadimos al menú la vista standalone: en esta vista el menú desaparece por eso haremos que el menú sea standalone
  ]

}
