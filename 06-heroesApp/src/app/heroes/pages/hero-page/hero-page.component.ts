import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{ //si necesito petición http en cuanto el componente esté listo: onInit

  public hero?: Hero; //propiedad opcional porque cuando el componente se monta a veces no hay datos

  //inyectamos el servicio
  constructor(
      private heroesService: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {}

  ngOnInit(): void {

    //leemos el URL con el servicio que ya viene: activatedRoute con el que tendremos acceso a todos los parámetros y a él me puedo suscibir siendo observable
    this.activatedRoute.params

      .pipe(

        //delay(3000), //retraso temporal para ver cómo carga con un LOADING que podemos estilar
        switchMap( ({ id }) => this.heroesService.getHeroById( id) ),//permite tomar los params pero quiero desestructurarlo y coger el id y llamo al service y al método creado que toma un ID: Si esto da un error,regresa undefined. Por eso vamos a preguntar

      ).subscribe( hero => {

          if( !hero ) return this.router.navigate([ '/heroes/list' ])
          //si no tenemos ningún héroe, retornamos al usuario con ROUTER y con navigate (o navigateByUrl) que pide un arreglo con todos los path a los que puedo navegar. SI existe un héroe, creamos una propiedad opcional hero que recibiremos 

          this.hero = hero;
          return;

          //console.log({params}); //mostramos por consola el objeto params
      })
  }

  //como ya tenemos el router puesto, aprovechamos para hacer método de volver que no regresa nada
  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }


}
