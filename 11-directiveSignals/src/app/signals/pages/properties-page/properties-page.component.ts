//componente generado con schematics con opción skip selector
import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
  

  //señal 
  public counter = signal(10);

  //creamos una señal
  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"

  });

  public fullName = computed( () => `${this.user().first_name} ${this.user().last_name}`)

  //efecto de cambiar de usuario: efecto con función y lo que queremos ejecutar cuando cambia
  public userChangedEffect = effect( () => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnInit(): void { //queremos demostrar la limpieza automática del efecto
    setInterval( () => {
      this.counter.update( current => current + 1);
    },1000);
  }
    
  ngOnDestroy(): void { //manualmente eliminamos ese efecto para que no se dispare
    //this.userChangedEffect.destroy();
  }

  //metodo para aumentar 
  increaseBy(value: number): void {
    this.counter.update( current => current + value );
  }

  //implementamos el método que recibe el campo que de momento es tipo string y el valor tipo string. 
  //Ahora cambiamos el tipo de field a tipo keyof User para que no se puedan asignar campos nuevos al usuario por error
  onFieldUpdated( field: keyof User, value: string) {

    //método update que sea lo que regresemos, es el nuevo valor del usuario
    this.user.update( current => {
        return{
          ...current,
          [field]: value
        }
    })
    
  }
}


/***********************************************
 * Tres maneras de actualizar la data de la señal:*/

/*ALTERNATIVA 1: operador SET + spread : "olvídate del valor anterior, establece el nuevo valor"

    this.user.set({
      ...this.user(),
      [field]: value,
    }); 
*/

//console.log({field, value}); //mostramos por consola el valor actual escribiendo dentro del input un texto que veremos en consola

/* ALTERNATIVA 2: MÉTODO MUTATE: cuando hacemos alguna modificación al objeto que tenemos va a disparar esa actualización

-->actualizar los datos mediante mutación: datos actuales del usuario current y cualquier mutación del objeto dispara nuevo valor en la señal: se dispara gracias al value
    this.user.mutate( current => {

      -->como hay varios tipos de campo: numero para el id y string para name y el email, hago switch
      switch (field) {

        case 'email':
          current.email = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id': //es tipo number y se debe convertir
          current.id = Number(value);
          break;
      }


    -->current.first_name = 'Hola Mundo';

ALTERNATIVA 3: UPDATE : el valor que retorne en el callback function va a ser el nuevo valor de la señal
this.user.update( current => {
        return{
          ...current,
          [field]: value
        }
    })

***********************************************/