import { Component } from '@angular/core';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css']
})

//en orden de Pipes haremos las propiedades

export class UncommonPageComponent {

    //i18n Select (poder cambiar el género por ejemplo)
    public name: string = 'Rober';
    public gender: 'male' | 'female'  |'undefined' = 'male'; //en tipo gender sólo tenemos dos opciones y elegimos 
    public invitationMap = { //creamos un map para ayudarnos a elegir si es masculino o femenino: Si es male X y si es female Y 
      'male' : 'invitarlo', //si es male saldrá en pantalla la palabra "invitarlo"
      'female' : 'invitarla', //si es female saldrá en pantalla la palabra "invitarlo"
      'undefined' : 'invitarlx'  //si es no definido saldrá en pantalla la palabra "invitarlo"
    }
    //método click que llama el button
    changeClient(): void {
      this.name = 'Anoa';
      this.gender = 'undefined';
    }

    //i18n Plural 
    public clients: string[] =['Noa','Ana','Lola','Sandra','Paloma','Natalia','Flor','Raquel','Veronika','Beatriz']


  }
