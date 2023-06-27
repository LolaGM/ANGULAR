import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

    //creamos las opciones del select que en princpio deberían volcarse desde la BBDD pero en este caso lo haremos manualmente con un ID y una descripción	
    public publishers = [
      {id: 'DC Comics' , desc: 'DC - Comics'},
      {id: 'Marvel Comics', desc: 'Marvel - Comics' }
    ]

}
