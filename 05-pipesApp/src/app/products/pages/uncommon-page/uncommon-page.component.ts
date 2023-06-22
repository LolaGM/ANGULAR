import { Component } from '@angular/core';
import { interval, tap, timeout } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css']
})

//en orden de Pipes haremos las propiedades

export class UncommonPageComponent {

    //i18n Select PIPE (poder cambiar el género por ejemplo)
    public name: string = 'Rober';
    public gender: 'male' | 'female'  |'undefined' = 'male'; //en tipo gender sólo tenemos dos opciones y elegimos 
    public invitationMap = { //creamos un objeto map para ayudarnos a elegir si es masculino o femenino: Si es male X y si es female Y 
      'male' : 'invitarlo', //si es male saldrá en pantalla la palabra "invitarlo"
      'female' : 'invitarla', //si es female saldrá en pantalla la palabra "invitarlo"
      'undefined' : 'invitarlx'  //si es no definido saldrá en pantalla la palabra "invitarlo"
    }
    //método click que llama el button
    changeClient(): void {
      this.name = 'Anoa';
      this.gender = 'undefined';
    }

    //i18n Plural PIPE
    public clients: string[] =['Noa','Ana','Lola','Sandra','Paloma','Natalia','Flor'];
    public clientsMap = { //creamos un objeto map para ayudarnos a que según el nº de clientes muestre un mensaje u otro
      '=0' : 'no tenemos ningún cliente esperando.',
      '=1' : 'tenemos 1 cliente esperando.',
      '=2' : 'tenemos 2 clientes esperando.',
      'other' : 'tenemos # clientes esperando.', //opción extra para dejar cubierto un número abierto de clientes      
    }

    deleteClient():void {
      this.clients.shift(); //para eliminar el primer cliente que ya lleva tiempo esperando
    }


    //KeyValue PIPE
    public person = { //creamos objeto
      name: 'Lola',
      age: 42,
      address: 'Málaga, Spain'
    }

    //Async PIPE (con observables )
    public myObservableTimer = interval(2000).pipe( //observable de tipo number reconocido por TS y podríamos indicarlo public myObservableTimer: Observable<number>
      tap( value => console.log('tap:', value))

       //con interval de RXJS es una manera de crear observables definidos por la cantidad de tiempo que indiquemos en milisegundos: hasta que alguien se suscribe a él, podremos ver la información
    ) 
    
    //Async PIPE (con promesa)
    public promiseValue:Promise<string>= new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('tenemos data en la promesa');
          console.log('tenemos data en la promesa');//valor de resolución de la promesa
          this.person.name = 'Otro nombre'//después de esto vamos a enseñar el nombre de esta persona
        }, 3500); //3 segundos y medio
    
     //las promesas no se pueden cancelar como pasa con el observable
     //le pasamos STRING en vez de number que aparecerá en pantalla 3 segundos después

    });

    


  }
