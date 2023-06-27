//snippet a-service o crear con schematics
//importar módulo http client en app module
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService { //cambiamos el nombre a HeroesService
    
    private baseUrl:string = environments.baseUrl; //apunta al archivo environments que importamos y la propiedad del objeto environments y su clave baseUrl que coincide en nombre con la propiedad  privada que he creado

    constructor(private http: HttpClient) { } //cambiamos a http 
    
    //función que va a retornar un observable así que importamos rxjs que va a estar emitiendo un objeto de tipo Hero arreglo

    getHeroes(): Observable<Hero[]>{
        return this.http.get<Hero[]>( `${this.baseUrl}/heroes`);
        //retorna este http con pètición que retorna Hero como arreglo y para usar este arreglo nos creamos una propiedad baseUrl.
        //llamamos con ``  una interpolación a la propiedad y le pasamos el endpoint heroes
    }

    //en este servicio recibimos el ID del héroe por string y retornamos un Observable que va a resolver o emitir un Hero o un UNDEFINED (por si es un ID que no existe)
    getHeroById(id:string): Observable<Hero | undefined>{

        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
            .pipe(
                catchError( error => of( undefined))

            )
        //retorna esta petición GET http que devuelve un Hero y entre paréntesis la URL de ese heroe con el ID. Si retorna un ID que no existe, manejamos ese error con .pipe para atrapar el error: si sucede puede ser el ID no existe o que el servidor no existe: retornamos observable creándolo con of con el valor entre () que regresa undefined como la opción que le dimos al Observable:Hero o undefined

    }

    //sugerencias en la búsqueda de heróes: una query con límite de 6 como parámetros
    getSuggestions( query:string ): Observable<Hero[]> {

        return this.http.get<Hero[]>(`${this.baseUrl }/heroes?q=${query}&_limit=6`);

    }
    

}