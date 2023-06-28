import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

    //nuevo grupo de formulario reactivo (importamos de angular forms ) que es un objeto del que crearemos propiedades y validaremos los campos. Enlazamos al html 
    public heroForm = new FormGroup({
          id:               new FormControl<string>(''),
          superhero:        new FormControl<string>('', {nonNullable:true}), //no permitimos que sea nulo
          publisher:        new FormControl<Publisher>(Publisher.DCComics), //importamos interface creada y le indicamos el valor por defecto
          alter_ego:        new FormControl<string>(''),
          first_appearance: new FormControl<string>(''),
          characters:       new FormControl<string>(''),
          alt_img:          new FormControl<string>('')
  });

    //creamos las opciones del select que en princpio deberían volcarse desde la BBDD pero en este caso lo haremos manualmente con un ID y una descripción	
    public publishers = [
      {id: 'DC Comics' , desc: 'DC - Comics'},
      {id: 'Marvel Comics', desc: 'Marvel - Comics' }
    ];

    //creamos un método para el formulario (no retorna nada)
    onSubmit(): void {

      console.log({
        formIsValid: this.heroForm.valid,
        value: this.heroForm.value
      });
    }
}
