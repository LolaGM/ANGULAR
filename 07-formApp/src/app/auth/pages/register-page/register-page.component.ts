import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    
    name: ['', [Validators.required]],
    email: ['', [Validators.required]], //la validación de Angular no es suficiente así que validaremos con un extra el email 
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]], //largo mínimo de 6 caracteres: podríamos aplicar una REGEX 
    password2: ['', [Validators.required]], //confirmacíón de que el password lo escribió bien


  });

  constructor(private fb:FormBuilder){}

  //validacion del campo
  isValidField( field: string){
    //TODO: obtener validación desde un servicio
  }

  //Para que se dispare que todos los formularios han sido tocados
  onSubmit(){

    this.myForm.markAllAsTouched();

  }

  
  //no olvidar importar el modulo reactiveForms en auth module




}
