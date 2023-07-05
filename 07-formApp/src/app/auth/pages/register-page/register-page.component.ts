import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { cantBeStrider } from 'src/app/shared/validators/validators.functions'; lo resumimos como importar TODO como customValidators de la ruta correspondiente pero como no lo usamos lo comentamos:
//import * as customValidators from 'src/app/shared/validators/validators.functions';

import { ValidatorsService } from '../../../shared/service/validator.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({ //field: ['vacio', validación síncrona, validación asíncrona]  en el tercer parámetro del constructor de un FormControl es donde se colocan las validaciones asíncronas.
    
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]], //validamos con la regex del service para nombre
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)] , [this.emailValidatorService]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]], //añado la función creada de validación sin invocarla () para que Angular la ejecute y le indico que viene
    password: ['', [Validators.required, Validators.minLength(6)]], //largo mínimo de 6 caracteres: podríamos aplicar una REGEX 
    password2: ['', [Validators.required]], //confirmacíón de que el password lo escribió bien
  },
    //colocamos las validaciones de contraseña abriendo un nuevo objeto validador que pasa como argumento implícito todo el formulario. Llamamos al service y el método creado con dos parámetros
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
      ]
    }
  );

  constructor(
      private fb:FormBuilder,
      private validatorsService: ValidatorsService,
      private emailValidatorService: EmailValidatorService
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

/* email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)] , [new EmailValidatorService()]], */ 
//validamos mail con service instanciandolo en la asíncrona e importamos este servicio y la usamos
