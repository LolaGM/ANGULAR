import { NgModule } from '@angular/core';

import { ContadorComponent } from "./contador/contador.component";

//tarea: crear módulo llamado ContadorModule que tenga declaraciones y exportaciones correspondientes pero que no tenga importaciones del commonModule ya que no contiene directivas
//no olvidar importarlo en app.module junto con el resto de módulos

@NgModule ({
    declarations: [
        ContadorComponent
    ],
    exports:[
        ContadorComponent
    ]
})

export class ContadorModule{

}