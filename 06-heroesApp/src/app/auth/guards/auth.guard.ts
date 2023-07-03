//los guards son servicios. En este  caso los usamos para proteger las rutas y necesitamos desarrollar una interfaz y depende donde necesitamos los guards
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,CanActivate,CanMatch,Route,Router,RouterStateSnapshot,UrlSegment,} from '@angular/router';

import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {

    constructor(
        private authService: AuthService, //inyectamos el servicio
        private router: Router,
    ) { }

    //método para centralizar la petición de canmatch y canActivate
    private checkAuthStatus(): boolean | Observable<boolean>{

        return this.authService.checkAuthentication() //comprobamos la autenticación y nos devolverán un observable  y hacemos la redirección de pantalla: si no está autenticado, mostrar una pantalla, y si lo está:
            .pipe(
                tap( isAuthenticated => console.log('Authenticated',isAuthenticated)),
                tap( isAuthenticated =>{
                    if( !isAuthenticated ) {
                            this.router.navigate(['/auth/login']);//si no está autenticado, muestra  pantalla de login
                        } 
                })
            )
                //como regresa un valor booleano,comprueba si está autenticado o no
            
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
