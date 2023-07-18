import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder); //con inject podemos inyectar servicios en funciones
  private authService = inject(AuthService);//inyeccion del servicio

  public myForm: FormGroup = this.fb.group({
    email:    ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });


  //método de login
  login(){

    const {email, password} = this.myForm.value; //extraemos con desestructuración las propiedades en variables  del objeto myForm : su valor
    
    this.authService.login(email,password) //para que la peticion se dispare, llamo al subscribe y recibo el exito
      .subscribe( success => {
          console.log(success);
        }
      )


    //console.log(this.myForm.value);
  }
}
