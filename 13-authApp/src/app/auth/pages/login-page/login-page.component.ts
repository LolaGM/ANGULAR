import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'; //importamos SWEET ALERT 2 para experiencia usuario y mostrar errores
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject(FormBuilder); //con inject podemos inyectar servicios en funciones
  private authService = inject(AuthService);//inyeccion del servicio
  private router      = inject(Router);//inyeccion del servicio para hacer la navegación de una pantalla a otra

  public myForm: FormGroup = this.fb.group({ //colocamos valores iniciales lo que normalmente estaría vacío
    email:    ['fernando@google.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, Validators.minLength(6)]]
  });


  //método de login
  login(){

    const {email, password} = this.myForm.value; //extraemos con desestructuración las propiedades en variables  del objeto myForm : su valor
    
    this.authService.login(email,password) //para que la peticion se dispare, llamo al subscribe y recibo el exito, pero con el error del service voy a cambiar el subscribe: 
      .subscribe( {
          next: () => this.router.navigateByUrl('/dashboard'), // si todo sale bien, llamo al router y navego al dashboard para cambiar de vista
          error: (message) => { //este error es un string y podemos usar SWEET ALERT
            Swal.fire('Error', message, 'error') //SWEET ALERT ( mensaje que aparece en ventana emerrgente, mensaje que sacamos del objeto err )
            //console.log({loginPage: error});
          } //si sale mal, lo atrapo con el error viendo por consola el error
        }
      )

    //console.log(this.myForm.value);
  }
}
