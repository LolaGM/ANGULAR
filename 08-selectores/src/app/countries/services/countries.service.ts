import { Injectable } from '@angular/core';

import { Country, Region, SmallCountry } from '../interfaces/country.interface';

import { Observable, combineLatest, map, of, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {


  //En Postman especificaremos los campos que queremos que nos traiga y lo guardamos en propiedad dejando sólo la parte que nos interesa
  private baseUrl = 'https://restcountries.com/v3.1';


  //creamos propiedad PRIVADA para las regiones para que no sean cambiadas a la que accedemos con GETTER que regresa un arreglo de Regiones
  private _regions: Region[] = [ Region.Africa, Region.Europe, Region.Asia, Region.Americas, Region.Oceania]; 

  constructor(
    private http: HttpClient,
  ) { }

  get regions(): Region[] {

    return [...this._regions ] //al hacer el spread... rompo la relación que hay con las regiones para que así si alguien rompe algo aquí, no pasa nada en el arreglo original
  }

  //ahora queremos traer los países por región así que creamos método que espera region y que treará un país pero como tiene tantos datos cada país creamos interface para usar sólo la data que me interesa
  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {

    //hacemos una condición por si viene vacía, que retorne arreglo vacío. Esto no es observable como debería así que lo transformamos usando OF
    if( !region ) return of([]);

    // usando la prpiedad baseUrl y los parámetros
    const url: string  = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    //hacemos la petición http GET que es un Observable del que usaremos los operadores
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [] //borders puede ser nulo así que usamos ?? como operador de Covalencia Nula
        }))
        ), //usamos map para tomar la response que son countries y regresamos lo que queramos: en este caso usamos el método MAP para arreglos donde tenemos una iteración de country y retornamos un objeto con la información solicitada con los 3 campos que hemos indicado. Ahora toca mostrarlos y los llamamos en el controlador

        tap( response => console.log({response})) //dispara efectos secundarios y depura errores retornando un Observable que es idéntico a la fuente. Sabrá lo que map retorna 
      )

    //return []; //regresamos un arreglo de smallcountry que realmente es un Observable que emite ese small country. Necesitaremos el servicio http cliente

  }

    //método para obtener el cca3 del país que retorna un Observable de tipo Smallcountry
  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry>{
    console.log({ alphaCode})

    //constante que contiene la url del país por código alpha USA y el resto de campos que llamamos  
    const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    
    return this.http.get<Country>(url) //transformamos al que parece país a País con los 3 campos que trae
      .pipe(
          map( country => ({
            name: country.name.common,
            cca3: country.cca3,
            borders: country.borders ?? [] //borders puede ser nulo así que usamos ?? como operador de Covalencia Nula
          })))  
  }

  //creamos método para mostrar los nombres de los países a partir de las fronteras: esperamos que nos lleguen los borders como string arreglo en el parámetro y nos regresan un Observable de tipo SmallCountry: regresamos objetos que LUCEN como smallCountries 
  getCountryBordersByCodes( borders: string[] ): Observable<SmallCountry[]> {

    //cláusula condicional de seguridad : si los borders no existen o son cero, retorna un nuevo Observable vacío
    if( !borders || borders.length === 0 ) return of([]);

    //ahora tengo un listado de borders: para cada una de ellos tengo que hacer peticion HTTP: el método getCountryByAlphaCode
    
    //creamos un arreglo para almacenar todos esos observables que serán de tipo Observable como arreglo
    const countriesRequests: Observable<SmallCountry>[] = [];

    //barremos cada uno de esos borders que tenemos en el arreglo y tenemos el código
    borders.forEach( code => {

        const request = this.getCountryByAlphaCode(code); //creamos la primera request que será igual al método mandándole el código. 
        
        countriesRequests.push(request); // Como ya la tenemos la almacenamos en countryRequest que al principio estaba vacío
    });

    //retornamos 

    return combineLatest(countriesRequests); //retornamos el conjunto de observables contenido en countriesRequests. CombineLatest será llamado con suscribe y va a emitir hasta que todos los observables dentro de este arreglo CountryRequests emitan un valor. Encadenamos otro switchmap en selector.ts

  }
}
