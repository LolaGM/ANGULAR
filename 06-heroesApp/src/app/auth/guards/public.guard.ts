//los guards son servicios. En este  caso con este publci, si estoy logueado que no vea la vista de login
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,CanActivate,CanMatch,Route,Router,RouterStateSnapshot,UrlSegment,} from '@angular/router';

import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {

    constructor(
        private authService: AuthService, //inyectamos el servicio
        private router: Router,
    ) { }

    private checkAuthStatus(): boolean | Observable<boolean>{ //dejamos pasar al usuario si está autenticado

        return this.authService.checkAuthentication() //comprobamos la autenticación y nos devolverán un observable  y hacemos la redirección de pantalla: si no está autenticado, mostrar una pantalla, y si lo está:
        .pipe(
            tap( isAuthenticated => console.log('Authenticated:',isAuthenticated) ),
            tap( isAuthenticated => {
                if( isAuthenticated ) { //retorna falso y los CAN no dejan regresa al usuario, por eso necesitamos un map
                    this.router.navigate(['./']);//si no está autenticado, muestra  pantalla de login
                } 
            }),
            map(isAuthenticated=> !isAuthenticated), //lo dejo pasar con el valor opuesto
        )
    }

    //recibo cuál es la ruta que quiere y protejo los path de ser vistos sin autenticación
    canMatch(
        route: Route,
        segments: UrlSegment[]
        ): boolean | Observable<boolean> {
            //console.log({ route, segments });
        
            //return false; //con false no nos deja ver las rutas si no estamos autenticados
            return this.checkAuthStatus();
        }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean | Observable<boolean> {
            //console.log('Can Activate');
            //console.log({route, state});
        
            //return false; //con false no nos deja ver las rutas 
            return this.checkAuthStatus();
        }
}
//ahora revisamos el app routing module y le pasamos el guard a las rutas si no estamos autenticados