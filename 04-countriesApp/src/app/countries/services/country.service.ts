//escribimos en el archivo vacío a-service y nos aparece la opción http client que  elegimos que luego importaremos como HttpClientModule en app.module o donde vayamos a necesitarlo
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, delay } from 'rxjs';

import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})

//cambiarle el nombre de ServiceName a CountryService
export class CountriesService {
    
    //copiamos la base de la URL que nos interesa
    private apiUrl:string = 'https://restcountries.com/v3.1';

    //guardamos en caché la información de cada búsqueda al volver al componente: por capital, pais y región guardo el término de busqueda, los países hallados. Creamos una nueva interface
    public cacheStore = {
        byCapital:   { term: '', countries: []},
        byCountries: { term: '', countries: []},
        byRegion:    { term: '', countries: []}
    } 

    constructor(private http: HttpClient) {//cambiamos a private http
        //console.log('CountriesService init');
     } 

    //creamos un método privado (para refactorizar los 3 métodos search menos el Alpha Code) que va a devolver ubn observable que emite nuestro contry como un arreglo
    //le añadimos e importamos un oeprador RXJS "delay" para que se muestre mientras carga la búsqueda
    private getCountriesRequest( url: string):Observable<Country[]> {
        //cualquier peticion de este Objeto get tiene que ser de tipo country con un arreglo
        return this.http.get<Country[]>(url) 
            .pipe(                 
                catchError( () => of([]) ),
                //delay(2000),  //tarda dos segundos en que una vez que se emite el valor del observable, va a tardar 2 seg en que pase el delay y así pmdemos probar un loading de carga
            );    
    }

    //buscamos un país por country code con este método. Nos regresa un arreglo la API o un NULL. EL endpoint contiene el nombre alpha
    searchCountryByAlphaCode( code: string ): Observable<Country | null> {

        const url = `${ this.apiUrl }/alpha/${ code }`;
    
        return this.http.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0]: null ),
                catchError( () => of(null) )
            );
        }
    //sirve para transformar la información y le pasamos un condicional ternario ? : Si largo de countries es mayor a 0,retorna countries en posición 0 (el primero de la lista),y si NO existe,que retorne NULL
    //si sucede un error, atrapa el error y retorna un nuevo observable que es un arreglo vacío o nulo
        
    //creamos método con un término de búsqueda como parámetro
    searchCapital( term: string ) : Observable<Country[]>{ 

        //retorna un Observable (this.get) con tipo de dato de interface Country que importamos pero más de 1: un arreglo

        //creamos una constante que contenga la URL
        const url = `${ this.apiUrl }/capital/${ term }`;
        return this.getCountriesRequest(url);            
    }


    searchCountry( term: string ) : Observable<Country[]>{

        const url = `${ this.apiUrl }/name/${ term }`; //porque name es el nombre del endpoint
        return this.getCountriesRequest(url);
    }


    searchRegion( region: string ) : Observable<Country[]>{

        const url = `${ this.apiUrl }/region/${ region }`; //porque region es el nombre del endpoint
        return this.getCountriesRequest(url);
    }    
}

/*
Dentro del observable PIPE podría usar los métodos siguientes (que debería importar para usarlos) aunque en este caso se usa el CATCHERROR para coger el error.
Si hay un error lo recibo aquí con un observable CatchError que importo y un OF dentro que sirve para construir un observable basado en el argumento que le mandemos.
Podríamos escribirlo también así de forma desgranada:

Vamos a usar el observable PIPE que es un método para especificar difertentes operadores RXJS e importamos este RXJS con los que usaremos tap, map o el método que queramos
Construimos la petición http de tipo get que retorna un tipo Country arreglo. Tenemos que suscribirnos para que escuche esa solicitud http

.pipe(
    catchError( error => {
        console.log(error);
        return of([])
    }      
);

En caso de usar métodos:

1-Uso tap y lo importo
2-en vez de regresar los países quiero retornar un arreglo vació []. El map lo importo y con su uso transforma la información

    tap(countries => console.log('Tap 1',countries) ),
    map(countries => [] ),
    tap(countries => console.log('Tap 2',countries) ),

*/