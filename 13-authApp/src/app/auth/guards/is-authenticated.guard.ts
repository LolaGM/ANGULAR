//guard creado con schematics eligiendo guard, desmarcando implements y marcando functional: luego marcamos canActivate
//lo colocamos en el router y validarlo
//este guard se encarga de proteger la ruta al dashboard, no verifica la peticion http o si estamos autenticados: estas autenticado? pasas, si no, no pasas
//implementamos el GUARD: en el state tenemos el URL donde el usuario quiere ir. La cogemos en const


import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  //saber si el usuario está autenticado o no
  const authService = inject(AuthService);
  const router = inject( Router ); //inyectamos el router

  //console.log({ status: authService.authStatus()}); //el status cambiará una vez pases de login a dashboard

  //el guard se encarga de bloquear a los usuarios si no están autenticados
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  if ( authService.authStatus() === AuthStatus.checking ) {
    return false;
  }

  //si no estamos autenticados devolvemos al usuario al login

  //const url = state.url;
  //console.log({url});
  //localStorage.setItem('url', url); //almacena el url
  
  router.navigateByUrl('/auth/login');

  return false;

  //console.log('isAuthenticatedGuard');
  //console.log({route,state});

  //return true; //si estamos autenticados true, y si no lo estamos false
};

/*
Cuando se recarga el navegador web entra el GUARD. Se aplica esa condición if.
Lo importante es que quita el url anterior y hay que asegurarse de saber el estado en el que está.
Comprobamos con dos if la situación




*/
