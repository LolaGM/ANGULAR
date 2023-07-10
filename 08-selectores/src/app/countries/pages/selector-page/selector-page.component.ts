import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';

import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  
})
export class SelectorPageComponent implements OnInit{

  public countriesByRegion: SmallCountry[] = []; //es un arreglo vacío
  public borders: SmallCountry[] = []; //por ahora es un arreglo de string pero luego será arreglo de SmallCountry

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required], //sólo 1 border o frontera para el país
  });

  constructor(
      private fb: FormBuilder,
      private countriesService:CountriesService //como es privado hacemos un getter aquí
      ){}


  ngOnInit(): void { 
    //llamamos al método que tiene la tarea en particular de cambiar la region y también la frontera: así creamos el listener para cuando hay cambios en la vista
    this.onRegionChanged();
    this.onCountryChanged();
  }


  get regions(): Region[] { //estas regiones ya es el arreglo con todas las regiones que quiero mostrar

    return this.countriesService.regions; //apunta por referencia al lugar donde tenemos nuestras regiones:sólo veo el getter de las regiones
  }

  //creamos método que no regresa nada y que contenga la implementación del cambio de region y que mandaremos por el OnInit.Lo que hará es escuchar cuando hay un cambio en el selector
  onRegionChanged(): void {

    this.myForm.get('region')!.valueChanges
    .pipe(// hacemos una conversión de la region y usamos operador que nos permite recibir el valor de un observable y suscribirme a otro observable SWITCHMAP que tiene el valor anterior(region) y disparamos el this.con el servicio y accedemos al método
      
      tap( ()=> this.myForm.get('country')!.setValue('')), //para limpiar el continente y el país para una nueva búsqueda usamos tap y decimos que a este myForm y su propiedad país que sabemos que siempre va a venir ! y establecemos su valor a un string vacío

      tap( ()=> this.borders = [] ), //para limpiar el país y establecer un arreglo vacío
      
      switchMap(region => this.countriesService.getCountriesByRegion(region) ),
    )
    .subscribe(countries =>{
      this.countriesByRegion = countries; //estos countries van a ser  iguales a los que recibo y que voy a mostrar por html

      //console.log({region});
      }
    )
  }

  //método para que cuando cambie el país salga la frontera del mismo: un listener
  onCountryChanged():void {

    this.myForm.get('country')!.valueChanges     //get con el nombre del control del form
    
    .pipe(// 
      
      tap( () => this.myForm.get('border')!.setValue('') ), //para que cuando el país cambia, cambie el borde o frontera 

      filter( (value: string) => value.length > 0 ),//filter recibe el valor anterior y comprueba que sea positivo

      switchMap((alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode) ),//retorna
      
      switchMap( (country) => this.countriesService.getCountryBordersByCodes( country.borders) ),//ahora lo que vamos a tener es un observable con un listado de smallcountries
    )

    .subscribe(countries =>{
      
      this.borders = countries; //estos borders serán igual a los countries
      //console.log({borders: country.borders}); //una vez obtenemos por consola el valor, hacemos el switchmap pero antes un método que nos traiga países por código Alpha
      }
    )


  }
}

/*
Código sin refactorizar:

ngOnInit(): void { 
      this.myForm.get('region')!.valueChanges
        .subscribe(value =>{
            console.log({region: value});
        }

        )
  }

El value del subscribe y el value del region lo quitamos

-----------------
Código refactorizado:

ngOnInit(): void { 
      this.myForm.get('region')!.valueChanges
        .subscribe(region =>{
            console.log({region});
        }

        )
  }

*/
