//primero: importamos el NGMODULE de @angular core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroeComponent } from './heroe/heroe.component';
import { ListadoComponent } from './listado/listado.component';

//tercero: decorador que contiene el array declarations que contiene en este caso los componentes de este módulo que se importarán arriba 
//exports:nos indican qué piezas son visibles fuera de este módulo
//imports: se listan sólo los módulos que se importan arriba de @angular/common
@NgModule({
    declarations:[
        HeroeComponent,
        ListadoComponent
    ],
    exports: [
        ListadoComponent,

    ],
    imports: [
        CommonModule
    ]
})

//segundo: empezamos con la clase exportada que se usa desde fuera que se llama como la carpeta y seguida del Module
export class HeroesModule {



}

//este module Heroes creado se importará en app module para que no de error