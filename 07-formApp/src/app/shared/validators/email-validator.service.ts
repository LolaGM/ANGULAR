/*es un servicio y un validator de objetos asíncronos como promesas u observables:  en el tercer parámetro del constructor de un FormControl es donde se colocan las validaciones asíncronas.Debemos implementar el método que es necesario: AsyncValidator.
Para que la clase sea un validator, denemos implemntar también el validate
*/

import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

import { Observable, delay, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class EmailValidatorService implements AsyncValidator{

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
    
        const email = control.value; //el control va estar asociado a un correo electronico

        //crear observables instanciando e importando desde rxjs.
        // Observable es un tipo pero también una clase que podemos instanciar y pide entre paréntesis un callback y dentro tendremos un subscriber(persona /ente /función suscrita a cambios ). En este observable va a fluir un validation error o null (los dos únicos valores que vamos a emitir).
        //Este observable puede emitir tantos valores como queramos
        const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) =>{

            console.log({email});//imprimo el email por consola a ver lo que escribió el usuario
            
            if ( email === 'fernando@google.com') {//pregunto si ese email que evalúo en el control es igual al producto de la petición http, aquí diría que ese correo ya está cogido
                subscriber.next({ emailTaken:true});//hago referencia al objeto subscriber y para emitir el siguiente valor
                subscriber.complete(); //hace la limpieza y se va a desuscribir: una vez que se completa el observable, se manda a llamar al subscriber.complete()
                //return;
            }

            //si no recibimos ese valor de email, emitimos que lo que la persona acaba de escribir en email no está cogido y luego lo completamos y ya no emite más valores
            subscriber.next(null);
            subscriber.complete();

        }).pipe(
            delay(3000)
        );

        return httpCallObservable;
    }
    
   



    
    
    
}

/*
-abstract Control es como el formControl o un array dependiendo de lo que necesitemos.Podemos quitar <any/><any>
-promesa asíncrona que retorne validationErrors (un objeto con clave) o null (significa que todo salió bien)
-o también puede ser un observable que va a emitir el validationError o un nulo
-trabajaremos con observables así que retiramos la promesa

validate(control: AbstractControl): Observable<ValidationErrors | null> {
    
-->el control va estar asociado a un correo electronico

        const email = control.value;
        console.log({email});
        
-->mostramos el email que estamos recibiendo del formControl

-->retornar la creación de un observable: regresa un objeto que diga que es true. Le pasamos el pipe y usamos el operador delay para ralentizar el email

        return of({
            emailTaken: true, -->sería igual a emailTaken { message: 'email ya registrado'}
        }).pipe(
            delay(2000)
        )
    }

-->petición http a backend() base de datos) con un endpoint al que se le manda el email,y basado en la respuesta:si el servicio me devuelve que ya existe (con return length ===0), regresamos el error del email (email is taken) y en caso contrario, regresamos null

return this.http.get<any[]>(`http://localhost:3000/users?q=${ email}`)
            .pipe(
                            map( resp => {
                    return (resp.length === 0) 
                    ? null
                    : { emailTaken:true}
                })
            );


-->opcional: sirve para determinar cuándo cambia el validator
    registerOnValidatorChange?(fn: () => void): void { 
        throw new Error('Method not implemented.');
    }
 */
