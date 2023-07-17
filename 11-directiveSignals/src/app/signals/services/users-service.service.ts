import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private http = inject ( HttpClient ); //inyeccion del cliente
  private baseUrl = 'https://reqres.in/api/users'; //endpoint donde quiero llegar
  
  //creamos método al que pasamos id de tipo number y regresa un Observable de tipo Object o creamos interface User
  getUserById( id:number): Observable<User>{ 

    //hacemos petición HTTP de tipo de interface creada y con literals indicamos la url seguido del id que recibo como argumento y tengo que regresar un usuario
    return this.http.get<SingleUserResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map( response => response.data),//extraigo la respuesta y de ella cojo la data (el usuario)
        tap( console.log)//ver qué información está fluyendo: un efecto secundario totalmente opcional
      );

  }
}

/*
En lugar del constructor, vamos a usar otra alternativa como la inyeccion de dependencia para las peticiones http
El servicio esta proveido en el ROOT: voy al app module y allí importo el HttpClientModule: ahora ya tenemos acceso a la inyeccion del cliente HTTP.
Necesitaré un backend https://reqres.in/ y por ejemplo usaremos para los usuarios https://reqres.in/api/users/2 y en Postman 
*/
