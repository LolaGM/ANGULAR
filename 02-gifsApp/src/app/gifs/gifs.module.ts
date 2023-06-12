import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent,
    ResultadosComponent
  ],
  exports: [ //no exportamos el resto de componentes de búsqueda y resultados por estar ya dentro del gifs page component
    GifsPageComponent   
  ],
  imports: [
    CommonModule
  ]
})
export class GifsModule { }
