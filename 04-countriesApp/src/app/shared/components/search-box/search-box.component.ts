import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input() 
  public placeholder:string = '';

  @Output() 
  public onValue = new EventEmitter<string>();

  //creamos una función con un valor de tipo string que no regresa nada
  emitValue(value:string):void {
      //console.log(value);
      this.onValue.emit(value);

  }
}
