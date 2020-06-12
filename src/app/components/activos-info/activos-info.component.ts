import { Component, OnInit } from '@angular/core';
import { Concentrado } from 'src/app/interfaces/interfaces';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-activos-info',
  templateUrl: './activos-info.component.html',
  styleUrls: ['./activos-info.component.scss'],
})
export class ActivosInfoComponent implements OnInit {
  estadoCheck: boolean;
  scanInfo: Concentrado[] = [];
  concentrado: Concentrado = {
    CODIGO_1: '',
    NUMERO_SERIE: '',
    MODELO: '',
    MARCA: '',
    DESCRIPCION: '',
    COLOR: '',
    ALTO: '',
    FONDO: '',
    FRENTE: '',
    CODIGO_2: '',
    UBICACION: '',
    DESCRIPCION_CORTA: ''
  };


  constructor(public barcodeScanner: BarcodeScanner,
              public dataLocal: DataLocalService) { }

  ngOnInit() {
  }

  async onSubmitScan(){
    console.log("Concentrado", this.concentrado);
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if( !barcodeData.cancelled){
        console.log(barcodeData);
        this.dataLocal.muestraInfoScan(barcodeData.format, barcodeData.text);
      }

     }).catch(err => {
         console.log('Error', err);
     });
  }

  updateSelect(event) {
    this.estadoCheck = event.detail.checked;
   
  }

}
