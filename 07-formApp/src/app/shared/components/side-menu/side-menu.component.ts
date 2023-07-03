import { Component } from '@angular/core';
import { ReactiveModule } from '../../../reactive/reactive.module';

//creamos interface para el menu
interface MenuItem {
    title: string;
    route:string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {

    public reactiveMenu: MenuItem[] = [
      { title: 'Básicos',
        route: './reactive/basic'
      },
      { title: 'Dinámicos',
        route: './reactive/dynamic'
      },
      { title: 'Switches',
        route: './reactive/switches'
      }
    ];	

    public authMenu: MenuItem[] = [
      { title: 'Registro',
        route: './auth'
      }
    ];	

}
