import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';

import { AuthStatus, CheckTokenResponse, User, LoginResponse } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService { //lo que es privado es interno al servicio pero hay qyue colocar algo al mundo exterior

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
  public currentUser  = computed( () =>  this._currentUser());
  public authStatus   = computed( () =>  this._authStatus());

  constructor(){
    //cuando necesito el servicio, llamamos el constructor
    this.checkAuthStatus().subscribe();

  }

  //método para refactorizar código con DRY(don't repeat yourself): no va a salir del servicio así que private. Necesito usuario y token
  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set( user); //el user que tengo es el mismo que estoy recibiendo por ahí
    this._authStatus.set( AuthStatus.authenticated); //el auth que llega va a ser el autenticado (no el checking)
    localStorage.setItem( 'token', token);//el token lo guardamos en local Storage:setItem con nombre variable que tendrá en localStorage y mando a grabar el token

    return true; 
  }

  //método para login que regresa un observable que si se hace correctamente retorna verdadero o falso:
  login(email:string, password: string): Observable<boolean>{

    const url   = `${ this.baseUrl }/auth/login`; //url al que vamos a llegar
    const body  = { email, password }; //en el body viene lo definido en postman que viene de la bbdd { email: email, password: password}

    //retornamos el POST de tipo loginResponse con el url que voy a disparar: al que voy a llegar. También necesito el body de la petición 
    return this.http.post<LoginResponse>( url, body )
      .pipe(
          map( ({ user, token }) => this.setAuthentication(user,token)), //llamamos al método de autenticación creado arriba
          //console.log({user,token});//mostramos por consola el user y token para analizarlo
          //si sucede un error en tap o map, atrápalo con catch y sacaremos el mensaje si sale mal:;objeto err y propiedad error y luego message
          catchError( err => throwError( () => err.error.message)),                   
        //console.log(err);//obsrevemos el error
        //usamos función throwError que espera una función que diga lo que salió mal: cambiamos en login page el subscribe y usaremos SWEET ALERT para experiencia usuario
        
        //return of(false); //usaremos otra forma
        );
  };

      //modificamos el flujo de data (el obsevable boolean no es igual al observable de tipo login que nos llega): response que desestructurado es user y token
  

  //verificamos el estado del token que regresa un observable boolean
  checkAuthStatus(): Observable<boolean> {

    const url   = `${this.baseUrl}/auth/check-token`; //tomamos el url
    const token = localStorage.getItem('token'); //tomamos el token

    //si no existe ningún token, sabemos que no está autenticado, cuando se desloguea esta desautenticado
    if( !token ){
      this.logout(); //reutilizamos el método de cierre de sesión
      //llamamos al logoout que es como this._authStatus
      return of(false); // retorna con OF un observable con el valor entre paréntesis
    }

    //si tenemos un token,vamos a verificarlo:creando los headers de autorización
    //mandar el bearer token del header del código de POSTMAN botón </> Javascript Fetch
    const headers = new HttpHeaders() //creando los headers HTML
      .set('Authorization', `Bearer ${ token }`);// copiamos la palabra del header y el bearer con token mandado

      //mandamos la petición http al url correspondiente
      // { headers: headers} que retorna un observable de otro tipo: por tanto, mapeamos y al error creamos un observable 
      return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
          map( ({ user, token }) => this.setAuthentication(user,token)), //llamamos al método de autenticación creado arriba
        //console.log({user,token});//mostramos por consola el user y token para analizarlo
        //si sucede un error en tap o map, atrápalo con catch y sacaremos el mensaje si sale mal:;objeto err y propiedad error y luego message
          catchError(  () => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          }),
      );
        //cuando verifiquemos el token de acceso también tenemos que cambiar el authstatus  
  }

  logout(){

    localStorage.removeItem('token'); //eliminar token
    //cambiamos los valores del usuario que siguen guardados aún 
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}

/*POSTMAN con POST y ruta localhost:3000/auth/login debería generarse un código token para ese usuario y ese código lo copiamos.
Ahora hacemos un GET en POSTMAN con ruta endpoint localhost:3000/auth/check-token y en >Authorizations> Type: bearer token y pegamos token
Este token nos genera otro token que tendremos siempre que el usuario esté en la app  */