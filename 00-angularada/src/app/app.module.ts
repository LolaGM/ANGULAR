import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HijoComponent } from './hijo/hijo.component';

@NgModule({
  declarations: [
    AppComponent,
    HijoComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    HijoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
