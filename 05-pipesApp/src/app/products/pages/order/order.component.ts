import { Component } from '@angular/core';
import { Hero, Color } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
})
export class OrderComponent {

    public isUpperCase: boolean = false;

    //propiedad pública para ordenar usando botón que uso en el pipe. Creamos método changeOrder
    public orderBy?: keyof Hero; //orderBY opcional de tipo keyof Hero

    public heroes: Hero[] = [
      { name: 'Superman',
        canFly: true,
        color: Color.blue,   
      },
      { name: 'Batman',
        canFly: false,
        color: Color.black,   
      },
      { name: 'Daredevil',
        canFly: false,
        color: Color.red,    
      },
      { name: 'Robin',
        canFly: false,
        color: Color.red,   
      },
      { name: 'Linterna Verde',
        canFly: true,
        color: Color.green,   
      },

    ]    

    //método para pasar de true a false (o viceversa) que no regresa nada (void) usando un botón
    toggleUpperCase(): void {
        this.isUpperCase = !this.isUpperCase; //este booleano es igual al valor de la negación (true a false y false a true)
    }

    //método para usar en los botones
    changeOrder(value: keyof Hero){
        this.orderBy = value;
    }

}
