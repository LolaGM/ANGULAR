import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { inject } from '@angular/core';

//los nombres ideales para los guard serían PublicGuard y PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  //saber si el usuario está autenticado o no
    const authService = inject(AuthService);
    const router = inject( Router ); //inyectamos el router

  //console.log({ status: authService.authStatus()}); //el status cambiará una vez pases de login a dashboard

  //si estamos autenticados, nos lleva al dashboard
    if ( authService.authStatus() === AuthStatus.authenticated ) {
        router.navigateByUrl('/auth/login');
        return false;
    }

    //si no estoy autenticado
    return true;

};

