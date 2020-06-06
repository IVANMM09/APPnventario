import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-importar-archivo',
  templateUrl: './importar-archivo.page.html',
  styleUrls: ['./importar-archivo.page.scss'],
})
export class ImportarArchivoPage implements OnInit {
 
  categorias = ['carga', 'consulta'];
  banderainv = this.categorias[0];

  constructor(     ) { }

  ngOnInit() {
  }

  cambioCategoria( event ){

    this.banderainv = event.detail.value;
 
   }

 
}
