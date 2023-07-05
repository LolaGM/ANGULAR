import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { cantBeStrider } from 'src/app/shared/validators/validators.functions'; lo resumimos como importar TODO como customValidators de la ruta correspondiente pero como no lo usamos lo comentamos:
//import * as customValidators from 'src/app/shared/validators/validators.functions';

import { ValidatorsService } from '../../../shared/service/validator.service';

@Component({
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]], //validamos con la regex del service para nombre
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]], //la validación de Angular no es suficiente usando Validators.email así que validaremos usando algo más: le pasamos el patrón de validación y como parámetro el regex
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]], //añado la función creada de validación sin invocarla () para que Angular la ejecute y le indico que viene
    password: ['', [Validators.required, Validators.minLength(6)]], //largo mínimo de 6 caracteres: podríamos aplicar una REGEX 
    password2: ['', [Validators.required]], //confirmacíón de que el password lo escribió bien
  });

  constructor(
      private fb:FormBuilder,
      private validatorsService: ValidatorsService
      ){}

  //validacion del campo
  isValidField( field: string){
    //retornamos validación desde un servicio invocando al método y al parámetro que es el formulario y pide el campo
    return this.validatorsService.isValidField(this.myForm, field);
  }

  //Para que se dispare que todos los formularios han sido tocados
  onSubmit(){

    this.myForm.markAllAsTouched();

  }

  
  //no olvidar importar el modulo reactiveForms en auth module




}
