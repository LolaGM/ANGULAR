//escribimos en el archivo vacío a-service y nos aparece la opción http client que  elegimos que luego importaremos como HttpClientModule en app.module o donde vayamos a necesitarlo
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})

//cambiarle el nombre de ServiceName a CountryService
export class CountriesService {
    
    //copiamos la base de la URL que nos interesa
    private apiUrl:string = 'https://restcountries.com/v3.1';

    //guardamos en caché la información de cada búsqueda al volver al componente: por capital, pais y región guardo el término de busqueda, los países hallados. Creamos una nueva interface cache store
    public cacheStore: CacheStore = {
        byCapital:   { term: '', countries: []},
        byCountries: { term: '', countries: []},
        byRegion:    { region: '', countries: []}, //tipo region que acepta string vacío
    } 

    constructor(private http: HttpClient) {//cambiamos a private http
        //console.log('CountriesService init');
    } 

    //para guardar en local store al información y que no se borre al actualizar la página, creamos método privado
    private saveToLocalStorage()  { //coge el objeto cacheStore y lo graba
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));//guardamos el string como JSON en este cacheStore
        //llamaremos este método cada vez que hagamos una modificación de este objeto. Hay observables que están pendientes de las modificaciones de objetos
    }

    private loadFromLocalStorage() {//es igual que save pero primero verificamos si la carga tiene este elemento
        //si no lo tiene ! no hay nada que hacer y retorna
        if( !localStorage.getItem('cacheStore')) return;
        //si existe, este cacheStore va a ser igual a
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')! )//para leer este objeto
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
        return this.getCountriesRequest(url) //con este observable que hace solicitud, puedo usar los operadores de RXJS que permiten ejecutar cierto código cuando esta solicitud se haga
            .pipe(
                tap(countries => this.cacheStore.byCapital = {term, countries}),//dispara un efecto secundario: cuando venga un mensaje en el observable, pasa por tap y se ejecuta, pero no va a influir en la misión del observable
                //también necesitaría grabar el término de búsqueda term así que igualo el objeto this a otro objeto que contiene los term y los countries y siendo redundantes quitamos cada propiedad: on objeto cuya propiedad apunta a un objeto que tiene el mismo nombre se elimina en ECMA6
                tap( () =>this.saveToLocalStorage())//para guardar  
            )       
    }


    searchCountry( term: string ) : Observable<Country[]>{

        const url = `${ this.apiUrl }/name/${ term }`; //porque name es el nombre del endpoint
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byCountries = {term, countries}),//dispara un efecto secundario: cuando venga un mensaje en el observable, pasa por tap y se ejecuta, pero no va a influir en la misión del observable
                //también necesitaría grabar el término de búsqueda term así que igualo el objeto this a otro objeto que contiene los term y los countries y siendo redundantes quitamos cada propiedad: on objeto cuya propiedad apunta a un objeto que tiene el mismo nombre se elimina en ECMA6
                tap( () =>this.saveToLocalStorage())//para guardar  

            ) 
    }


    searchRegion( region: Region ) : Observable<Country[]>{ //cambio el tipo a Region

        const url = `${ this.apiUrl }/region/${ region }`; //porque region es el nombre del endpoint
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byRegion = {region, countries}),//dispara un efecto secundario: cuando venga un mensaje en el observable, pasa por tap y se ejecuta, pero no va a influir en la misión del observable
                //también necesitaría grabar el término de búsqueda term así que igualo el objeto this a otro objeto que contiene los term y los countries y siendo redundantes quitamos cada propiedad: on objeto cuya propiedad apunta a un objeto que tiene el mismo nombre se elimina en ECMA6
                tap( () =>this.saveToLocalStorage())//para guardar  

            ) 
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