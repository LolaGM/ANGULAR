import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})

export class ByRegionPageComponent implements OnInit {

  public countries:Country[] = []; //iniciamos arreglo vacío
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];//arreglo de regiones de tipo TYPE definido que tiene siempre el mismo listado de regiones que hemos convertido (es mejor type que usar una interface porque éstas se amplian)
  public selectedRegion?:Region; //propiedad publica para saber en que región se encuentra el usuario que haya pulsado una opción que luego llamamos en el método
  public initialValue:string = ''; //creamos propiedad para guardar el valor inicial de búsqueda como string vacío que tambien colocamos en el ngOnInit

  
  //inyectamos el service creado con la URL que luego llamamos con this
  constructor(private countriesService:CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }
    
  //creamos una función con un valor de tipo string que no regresa nada
  searchByRegion(region:Region):void{
    
    this.selectedRegion = region; //cambio el tipo de parámetro region de string a Region en el método. En el HTML uso el ngClass: directiva que te permite aplicar una u otra clase a un elemento de html, dependiendo de una condición o expresión buleana.
    
    //llamamos al servicio y al método y le pasamos la region. No olvidemos subscribirnos para que se reciban notificaciones al que le pasamos countries definido arriba
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
      });
    
    //console.log({term});//mostramos el objeto
  }
}