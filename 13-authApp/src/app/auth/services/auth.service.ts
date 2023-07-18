import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environments';

import { AuthStatus, User } from '../interfaces';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService { //todo lo  privado es interno al servicio pero hay qyue colocar algo al mundo exterior

  //para asegurarnos que no editan ni cambian aunque usen el mismo servicio
  private readonly baseUrl:string = environment.baseUrl;

  //inyectamos el http client que también podemos hacer con el constructor
  private http = inject( HttpClient );

  //saber el usuario actual: indico que es privada y _ para indicar visualmente que lo es
  //uso una señal de valor nulo que puede ser de tipo usuario (pendiente de crear) o tipo  nulo
  private _currentUser = signal<User | null>(null);

  //cómo sabemos el estado de autenticación? Creamos señal de tipo Auth  y a signal indico argumentos: cuando montamos servicio por primera vez: el estado es checking
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //si quiero exponer al usuario o al authStatus, utilizo señal computada que retorna el valor que tenga esa señal
  public currentUser  = computed( () =>  this._currentUser())
  public authStatus   = computed( () =>  this._authStatus())

  constructor(){}

  //método para login que regresa un observable que si se hace correctamente retorna verdadero o falso:
  login(email:string, password: string): Observable<boolean>{

    const url = `${ this.baseUrl }/auth/login`; //url al que vamos a llegar

    const body = { email, password }; //en el body viene lo definido en postman que viene de la bbdd { email: email, password: password}

    //retornamos el POST de tipo loginResponse con el url que voy a disparar: al que voy a llegar. También necesito el body de la petición 
    return this.http.post<LoginResponse>( url, body )
      .pipe(
        tap( ({ user, token }) =>{ 
            this._currentUser.set( user); //el user que tengo es el mismo que estoy recibiendo por ahí
            this._authStatus.set( AuthStatus.authenticated); //el auth que llega va a ser el autenticado (no el checking)
            localStorage.setItem( 'token', token)//el token lo guardamos en local Storage:setItem con nombre variable que tendrá en localStorage y mando a grabar el token
            
            console.log({user,token});//mostramos por consola el user y token para analizarlo
        }),
        map( () => true)//si el flujo va bien y como tap no soluciona la diferencia de tipos en Observable, usamos map. Esto es en el caso de que teodo salga bien pero para manejar errores
        //TODO errores
      );

      //modificamos el flujo de data (el obsevable boolean no es igual al observable de tipo login que nos llega): response que desestructurado es user y token
  

  }
}
