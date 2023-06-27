import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [ 
  ]
})
export class SearchPageComponent {

  //importamos los formularios reactivos en el módulo Heroes
  public searchInput = new FormControl('');

  //propiedad para almacenar los resultados cada vez que cambia el search input
  public heroes:Hero[] = []; // inicializamos arreglo vacío y luego se rellenará con el método search input
  public selectedHero?: Hero; //hacemos propiedad opcional 
  
  //inyectamos el servicio en este componente mediante el constructor
  constructor(private heroesService:HeroesService){}

  searchHero(){

    //tomamos el valor del input
    const value:string = this.searchInput.value || ''; //en un punto determinado ese valor puede ser nulo así que le damos la opción con || de ser vacio ''. 

    //imprimimos por consola el valor del objeto y ahora hay que capturarlo:service pero para usar service lo inyectamos a través del constructor
    //console.log({value});

    //este servicio que tiene como método cuyo término del query es value. Cuando tenemos los valores nos suscribimos: los heroes que recibimos serán igual a los heroes arreglo=> ahora mostrarlo por HTML con el autocomplete
    this.heroesService.getSuggestions(value)
      .subscribe( heroes => this.heroes = heroes)
  }

  //implementamos el método de haber buscado algo y que no devuelve nada. Recibimos el evento (tipo de dato?? => matAutocompleteSelectedEvent que es propio de MATERIAL UI)
  onSelectedOption(event: MatAutocompleteSelectedEvent): void{

    //console.log(event.option.value);

    if( !event.option.value ) { //si ese event no existe
      this.selectedHero = undefined; // será undefined y lo mostraremos en el HTML al final
      return; //que no haga nada
    }

    //pero si no es undefined y tenemos un héroe,lo tomamos del event.option.value 
    const hero: Hero = event.option.value;
    this.searchInput.setValue ( hero.superhero ); //para establecer el valor de este  heroe recibido lo ponemos igual al hero.superhero seleccionado (en este caso sólo el nombre superhero o lo que necesitemos mostrar)

    this.selectedHero = hero; //este hero va a ser igual que el hero que tengo en el input en pantalla

    //console.log({event})
  }

}
