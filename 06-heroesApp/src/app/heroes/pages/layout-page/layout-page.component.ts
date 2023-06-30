import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    {
      label: 'List',
      icon: 'label',
      url: './list' //url definidos en los routing
    },
    {
      label: 'Add',
      icon: 'add',
      url: './new-hero' //url definidos en los routing
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search' //url definidos en los routing
    },
  ];
  

  constructor(
    private authService:AuthService,
    private router:Router
    ){
  }

  get user():User | undefined {
    return this.authService.currentUser;
  }


  onLogout(): void {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
  }

}

/*
Después de construir los items del menú, pasamos a hacer el logout del usuario.

Inyectamos el servicio auth

Creamos método onLogout en el que indicamos este servicio y aplicamos método logout que se creó en el auth service

Para identificar el nombre del usuario autenticado, creamos acceso a ese nombre mediante getter que regresa un User o undefined. Este debe retornar el current user declarado en auth service

Ahora queremos que el usuario deslogueado vea una página de inicio como auth login por ejemplo: usamos router

*/
