//snippet a-service o crear con schematics
//importar módulo http client en app module
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}