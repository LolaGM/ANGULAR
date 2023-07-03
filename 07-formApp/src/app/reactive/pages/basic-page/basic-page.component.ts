import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})

//creamos formulario reactivo e importamos modulo reactiveForms
export class BasicPageComponent {

   //crear formulario con FormBuilder: primero inyectamos servicio de Angular que importamos de Forms ( así no tenemos que estar usando siempre FormControl)
    public myForm:FormGroup = this.fb.group({ //mandamos un objeto con propiedades name, price,inStorage y les declaro un arreglo de: [valor inicial,validador síncrono,validador asíncrono] con valor vacío o 0
        name: [''],
        price:[0],
        inStorage: [0]

    })

    constructor(private fb: FormBuilder){}

    //para saber el valor del posteo del Form cuando le pasamos valores y que llamaremos con el NgSubmit
    onSave():void{
      console.log(this.myForm.value); 
    }


}

/*
Podemos hacer a mano el formulario o crearlo con FormBuilder que es más fácil de leer y agrupa los campos del formulario.

En caso de hacerlo a mano:

public myForm: FormGroup = new FormGroup({

      name: new FormControl(''), //dentro  ('', [], []) tenemos el primer valor o valor por defecto seguido de validaciones síncronas (si hay más de una la colocamos dentro de las llaves),y por último validaciones asíncronas pero como no las usamos en este caso, las quitaremos
      price: new FormControl(0), // indicamos cero para precio
      inStorage: new FormControl(0)   // indicamos cero para en almacén
    });

*/
