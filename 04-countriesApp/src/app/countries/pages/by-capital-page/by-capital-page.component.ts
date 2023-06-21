import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})

export class ByCapitalPageComponent implements OnInit{

  public countries:Country[] = []; //iniciamos arreglo vacío
  public isLoading:boolean = false;  //propiedad pública para que el spinner sólo aparezca en pantalla al buscar algo y que incluimos en el método
  public initialValue:string = ''; //creamos propiedad para guardar el valor inicial de búsqueda como string vacío que tambien colocamos en el ngOnInit

  //inyectamos el service creado con la URL que luego llamamos con this
  constructor(private countriesService:CountriesService){}

  //implementamos el OnInit para guardar la información buscada cuando cambio de componente
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;


  }
    
  //creamos una función con un valor de tipo string que no regresa nada
  searchByCapital(term:string):void{    

    this.isLoading = true; //aquí es donde se carga ya el spinner siendo verdad cuando buscamos algo
        
    //llamamos al servicio y al método y le pasamos el término. No olvidemos subscribirnos para que se reciban notificaciones al que le pasamos countries definido arriba
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false; //cuando se termina la petición de búsqueda debemos ocultar el spinner
      });
    
    //console.log({term});//mostramos el objeto
  }
}
