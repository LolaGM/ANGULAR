import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api'; // código disponible en primeNG configuration

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// código disponible en primeNG configuration
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}
