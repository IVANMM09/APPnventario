import { Component, OnInit } from '@angular/core';
import { Concentrado } from 'src/app/interfaces/interfaces';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { TasksService } from '../../services/tasks-service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-activos-info',
  templateUrl: './activos-info.component.html',
  styleUrls: ['./activos-info.component.scss'],
})
export class ActivosInfoComponent implements OnInit {
  estadoCheck: boolean;
  estadoCheckC: boolean;
  scanInfo: Concentrado[] = [];
  datosActivos: any [];
  concentrado = {
    idDatofijo: '',
    noCapturas: '',
    numInv: '',
    noSap: '',
    descripcion: '',
    ubicacionInt: '',
    ubicacionAnt: '',
    edoFisico: '',
    descCorta: '',
    marca: '',
    modelo: '',
    serie: '',
    color: '',
    dimensiones: ''
  };


  constructor(public barcodeScanner: BarcodeScanner,
              public dataLocal: DataLocalService,
              public taskService: TasksService,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos guardados existosamente',
      duration: 1500
    });
    toast.present();
  }

  async onSubmitScan(){
    if(this.concentrado.noCapturas!==null && this.concentrado.noCapturas!==""){
      for (let index = 0; index < Number(this.concentrado.noCapturas); index++) {
        console.log("Entro a guardar en el ciclo ");
        this.taskService.insertCaptura(this.concentrado);
        this.concentrado.numInv = this.concentrado.numInv+1;
      }
    }else{
      console.log("Entro a guardar ");
      this.taskService.insertCaptura(this.concentrado);

    }
    this.presentToast();

    console.log("Concentrado", this.concentrado);
  }

  async presentToastMsgVacio() {
    const toast = await this.toastController.create({
      message: 'Numero Inventario se encuentra vacio ',
      duration: 1500
    });
    toast.present();
  }

  getNumInv(){
    console.log()
    if(this.concentrado.numInv!=''){
      this.taskService.getCapturaByNumInv(this.concentrado.numInv)
      .then(response => {
      this.datosActivos = response;
      console.log("Regreso " + this.datosActivos);
      })
      .catch( error => {
      console.error( error );
      });
    }else{
      this.presentToastMsgVacio();
    }

 }


  scanCel(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if( !barcodeData.cancelled){
        console.log(barcodeData);
        this.dataLocal.muestraInfoScan(barcodeData.format, barcodeData.text);
      }

     }).catch(err => {
         console.log('Error', err);
     });

    // this.getNumInv();
  }

  updateSelect(event) {
    this.estadoCheck = event.detail.checked;
   
  }

  updateSelectCamara(event) {
    this.estadoCheckC = event.detail.checked;
   
  }



}
