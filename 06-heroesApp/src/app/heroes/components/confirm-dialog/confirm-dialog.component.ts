import { Component,Inject} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; //MAT_DIALOG_DATA es el token para saber cuál es el servicio que estamos importando manualmente

import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {

  //Copiamos código TS del Dialog de Material para insertar acciones en los botones importando las inyecciones y reemplazando por nuestro componente
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero, //indicamos que esperamos Hero como nuestros datos y lo importamos
  ) {
    //console.log({data}); //mostramos el objeto data que es lo que el usuario querría eliminar
  }

  onNoClick(): void { //onNoClick cierra el diálogo dejando el close en false
    this.dialogRef.close(false);
  }

  onConfirm():void{ //con este método al hacer click en OK hacemos que se cierre con true
    this.dialogRef.close(true);

  }
}
