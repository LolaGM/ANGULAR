import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validator.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})

export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required], //por defecto M de masculino
    wantNotifications: [true,Validators.required], //true indica que tiene que haber un valor seleccionado
    termsAndConditions: [false,Validators.requiredTrue] //aquí sí tiene que ser un valor verdadero
  })

  //propiedad 
  public person = {
    gender: 'F',
    wantNotifications: false
    //TERMS and CONDITIONS lo establecemos para validar el formulario y no para establecerlo a una persona
  }

  //inyectamos FormBUilder
  constructor(
      private fb: FormBuilder,
      private validatorsService: ValidatorsService
      ){}

  //al ser un método usado en los 3 formularios se debería usar sólo desde un sólo lugar y no copiarlo y pegarlo
  isValidField(field: string):boolean | null{ //regreso una condición para comprobar el campo del formulario usando errors o hasError y si ha sido tocado. Paso esto al HTML
          
    return this.myForm.controls[field].errors 
        && this.myForm.controls[field].touched;
  }


  //ngSubmit al guardar el form
  onSave() {

    if( this.myForm.invalid){
      this.myForm.markAllAsTouched(); 
      return; //si es invalido el form, no retorna nada
    }

    //terms and conditions no la necesitaremos para la persona: desestructuramos termsAndConditions y spread con newPerson que será el objeto con todas las propiedades menos terms and conditions
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson//los valores de newPerson serán los que se hayan establecido por formulario menos terms and conditios y estos son los que mostraremos por HTML
    console.log(this.myForm.value); //mostramos por consola todos los valores de myForm
    console.log(this.person); //mostramos por consola todos los valores de this.person que serán newPerson

  }


}
