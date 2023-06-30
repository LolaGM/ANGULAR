import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environments } from 'src/environments/environments';

import { User } from '../interfaces/user.interface';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = environments.baseUrl; 
  private user?: User;

  constructor(private http: HttpClient ) { }

  get currentUser(): User | undefined { 
    if(!this.user) return undefined;
    return structuredClone( this.user );
  }

  login(email: string ,password: string): Observable<User> {

    //http.post('login',{ email, password});

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', 'asdfoijhe.A455.fsdf12'))
      );
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

}
/*
-haremos varias peticiones http para llegar al user así que guardamos en baseUrl la URL del entorno.

-queremos tener al usuario autenticado con tipo de 
dato Interface creado User usando Paste Json as Code

-el user es  private porque no queremos que se acceda o se modifique desde fuera. Todo cambio debe controlarse a través del service

-ponemos opcional? al user porque en algún momento este usuario no va a existir

-para que otros componentes puedan usar al user usaremos getters: de tipo user o undefined (no declarado aún el valor)

-preguntamos en el getter si el usuario no !existe, retorna undefined.Y si existe,retornamos ese usuario hecho clon con structuredClone de JS (hace un deep clon de ese objeto User): no importa cuantas propiedades u objetos tenga user?.Podríamos usar tambien spread [...this.user]

-login RUDIMENTARIO=> para que el usuario ingrese en la app necesitamos un servicio del login que reciba email y password y regresamos un observable de tipo User que retornara valor verdadero o falso

-traer al usuario 1 con su endpoint mediante peticion http GET y lo que queremos regresar con pipe: uso tap donde tengo la respuesta: uso dos taps
  -->que es un usuario {} y será igual al usuario que ya tngo.
  -->Debo grabarlo en localstorage el id del usuario: setItem(el token que será el user.id que al ser number lo pasamos a string con método toString)
  Cambiamos esto a algo parecido a un Jason Web Token para simular el login

-creamos método logout que será inyectado en componente layout: este usuario tendrá valor de no definido y el localstorage
se deberá borrar con clear o removeItem

-más adelante traeríamos la petición http post un login con mail y password 


 */
