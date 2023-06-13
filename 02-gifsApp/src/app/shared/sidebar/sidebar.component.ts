import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  

  get historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService:GifsService){}

  buscar(termino:string){
    console.log(termino);//muestra por pantalla el click hecho en el sidebar
    this.gifsService.buscarGifs(termino);
  }
}
