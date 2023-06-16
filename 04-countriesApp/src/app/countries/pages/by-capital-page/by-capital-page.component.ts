import { Component } from '@angular/core';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})

export class ByCapitalPageComponent {

    
    //creamos una función con un valor de tipo string que no regresa nada
    searchByCapital(term:string):void{
      console.log('From Capital Page');
      console.log({term});//mostramos el objeto
    }
}
