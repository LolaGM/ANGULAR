import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  //otro tipo de inyección de formulario alternativa a la clásica de usar el constructor
  private fb = inject (FormBuilder);

  //propiedad color
  public color: string = 'green';

  //creamos formulario
  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(6),Validators.email] ], //string vacío que contiene las validaciones
  });

  changeColor(){ //copiamos color aleatorio generado 
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    //este color va a ser igual al color que estoy generando
    this.color = color;

    // o lo que es lo mismo: this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }


}


/*
En vez de inyectar el formulario por el constructor usamos otro tipo de inyección.

El constructor sigue siendo válido usarlo para ello pero usamos en vez de ello el INJECT mandando la clase que quiero inyectar

*/