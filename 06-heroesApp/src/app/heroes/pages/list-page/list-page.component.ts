import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit { //cualquier petición http debe estar al inicio de montar el componente

  public heroes: Hero[] = []; //propiedad de tipo Hero arreglo inicializada vacía

  //llamamos al servicio 
  constructor(private heroesService: HeroesService){}
  
  ngOnInit(): void { //al inicio del componente que llame al HeroesService y a la función getHeroes sin parámetros y para que se dispare le observamos con subscribe que los heroes que regresa son iguales a los heroes que regresa el servicio
    this.heroesService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
