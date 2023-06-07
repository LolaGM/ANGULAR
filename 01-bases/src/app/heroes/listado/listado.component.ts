//comando CLI para generar este componente: ng g c heroes/listado
//ng generate component carpeta destino/nombre carpeta donde se guardarán los 4 archivos: ts,html, css, spec
import { Component} from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent {
    heroes: string[] = ['Spiderman', 'Ironman', 'Hulk', 'Thor']; //array de tipo array que contiene listado
    heroeBorrado: string = '';//inicializamos el heroeBorrado a un string vacío

    borrarHeroe(){ 
      this.heroeBorrado = this.heroes.shift() || '';      
    }
}

//directiva ngIf para no ver Heroe Borrado si no se ha borrado nada
//verificaremos si string HeroeBorrado está vacío

//método borrarHeroe para borrar que llamamos en el botón
      //console.log('Borrando...'); //mostramos por consola las veces que borra
      
      //this.heroes.pop(); //1 método pop/splice/shift para borrar el  último item del string heroes
      //podríamos borrar el array entero usando esto para hacerlo vacío
      //this.heroes = []; 

      //podríamos guardar el héroe borrado en constante para mostrarla en web y esa constante usarla como propiedad
      //const heroeBorrado = this.heroes.shift();
      //this.heroeBorrado = heroeBorrado;
      //this hace referencia a la propiedad de la clase que empieza como string vacío y lo iguala a heroeBorrado pero podría hacerlo en una sola línea
      //como puede dar undefined le damos la opcion || de que retorne algo vacío '' así qUe ya podemos llamarlo desde HTML con {{}}
      //console.log(heroeBorrado);