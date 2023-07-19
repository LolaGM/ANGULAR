import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//everything pasa por aquí
export class AppComponent {

  private authService = inject(AuthService); //llamamos al servicio
  private router = inject(Router) //llamamos al router por si redirigimos a otra vista

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking){
      return false;
    }

    //si terminamos 
    return true;
  });  

  //petición HTTP: creamos efecto: queremos que según status, redireccionamos al usuario a la pantalla: usamos SWITCH condicional
  public authStatusChangedEffect = effect( () => {

    switch( this.authService.authStatus()  ){
        case AuthStatus.checking:
          break; //valdría return; también
        
        case AuthStatus.authenticated: //si tenemos grabado donde quería ir no haría falta indicar el URL de destino
          this.router.navigateByUrl('/dashboard');
          break; //valdría return; también

        case AuthStatus.notAuthenticated: 
          this.router.navigateByUrl('/auth/login');
          break; //valdría return; también

    }
    //this.authService.authStatus();
    //console.log('first');

  });

}

//podríamos crear una variable que dependiendo del servicio, indique si estoy autenticado o no pero usaremos una señal computada que retorne valor boolean que es de tipo boolean