import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interface/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {

  //propiedad en la clase. Usamos los getters para facilitar el acceso al HTML. Los resultados (que ahora ya sabemos son de tipo Gif) son una propìedad del gifsservice
  get resultados() { 
    return this.gifsService.resultados;
  }

  constructor(private gifsService:GifsService){}
}
