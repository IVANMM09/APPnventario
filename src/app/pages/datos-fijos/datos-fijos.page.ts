import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-datos-fijos',
  templateUrl: './datos-fijos.page.html',
  styleUrls: ['./datos-fijos.page.scss'],
})
export class DatosFijosPage implements OnInit {

   categorias = ['captura', 'consulta'];
   banderacat = this.categorias[0];

  constructor() { }

  ngOnInit() {
  }

  cambioCategoria( event ){

   this.banderacat = event.detail.value;

  }
}
