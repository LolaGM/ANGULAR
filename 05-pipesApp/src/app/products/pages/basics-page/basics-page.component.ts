import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
})
export class BasicsPageComponent {

  //creo 3 propiedades para usarlas luego en el basics page component html
  public nameLower:string = 'lola';
  public nameUpper:string = 'LOLA';
  public fullName:string = 'LoLa gArCiA';

  public customDate:Date = new Date(); //función fecha con hora minutos segundos de ahora mismo


}
