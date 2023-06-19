import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
})

//recordemos que aquí sólo debería devolvenos un país y no un arreglo de listado así que la búsqueda será distinta. Vayamos a countryService

//aquí necesito dos cosas: obtener el URL y poder navegar a la persona usuaria
//recordemos el ID que le dimos en los ROUTERS

//al constructor le inyecto un par de servicios: 1) activated Route que importamos y 2)snapshot URL (por si queremos mostrar el URL al usuario)

//añadimos el implements OnInit (que importamos e implementamos con quick fix encima del componente) para que haga algo al inicio de la carga que el constructor hace. Es como una pantalla de carga mientras se carga la información
//hacemos otra inyección con countriesService
export class CountryPageComponent implements OnInit {

  //nueva propiedad de tipo COuntry que puede ser ?nula
  public country?: Country;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService    
    
    //si tenemos un NULL tenemos que sacar al usuario de esta pantalla de error y usamos ROUTER y luego una condicional dentro del subscribe de si el country no existe lo retornemos a la página que queramos (en este caso home '') y si existe 
    ){}

  //dentro llamamos a los activated y le pasamos el Observable params y después otro observable pipe y luego subscribe
  //le pasamos los paramatros de tipo Params como dato y función flecha que retorne por pantalla el id de ese params
  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id)), 
        )
      .subscribe( country => { 
        
        if( !country ) return this.router.navigateByUrl('');
        return this.country = country;
        //este país declarado arriba será igual al country que estoy recibiendo en el subscribe
        
    });  
  }
}

/*

Este es el OnInit original que hemos hecho más limpio:

ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( (params) => {
          console.log( {params: params['id'] });
      })
  }

tap es un RXJS que dispara efectos secundarios pero en este caso usaremos SWITCHMAP

Cuando el id cambia, estaremos suscritos a los cambios, pero estaría bien cancelar suscripción para ahorrar memoria.
Esto es un Observable Hell: uno dentro de otro. Hay varias técnicas para limpiar esto como meterlo en un nuevo método o usar los RXJS observables
*/

