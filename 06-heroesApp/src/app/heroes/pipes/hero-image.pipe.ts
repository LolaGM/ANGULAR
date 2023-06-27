import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})

export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string { //recibimos el heroe y retornamos url
    
  //comprobamos si el id y la imagen existen: si NO es así que retorne de la carpeta assets la imagen en blanco
    if ( !hero.id && !hero.alt_img ){ //creamos la propiedad alt img porque no existe->interface
      return 'assets/no-image.png';
    }

    //comprobamos si existe ese alt y que lo devuelva
    if (hero.alt_img) return hero.alt_img;

    //si existe, que retorne la imagen
    return `assets/heroes/${ hero.id }.jpg`;

  }
}

