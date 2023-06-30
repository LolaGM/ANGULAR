import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  onLogin(): void{

    this.authService.login('lola@gmail.com','123456')
      .subscribe( user =>{
          this.router.navigate(['/']);
      });

  }
}

/*
-método login que no regresa nada para ingresar el usuario
-necesitamos ocupar el service así que con el constructor llamamos al service
-al hacer click en onLogin, llamamos al service que a su vez tiene método login con email y password
-al ser un Observable, tenemos que hacer que se dispare con suscribe
-al hacer suscribe con login, recibimos un observable user
-si todo es correcto, el user debe navegar a otra pantalla y por eso usamos en el service Router
-indicamos la navegacíón a / porque lo redirecciona automáticamente

*/
