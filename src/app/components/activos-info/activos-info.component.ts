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
    console.log("capturas" +this.concentrado.noCapturas);
    if(this.concentrado.noCapturas!==null && this.concentrado.noCapturas!==""){
      for (let index = 0; index < Number(this.concentrado.noCapturas); index++) {
        console.log("NumInv " + this.concentrado.numInv);
        this.taskService.insertCaptura(this.concentrado);

        this.concentrado.numInv = String(Number(this.concentrado.numInv)+1);

      }
    }else{
      this.taskService.insertCaptura(this.concentrado);

    }
    this.presentToast();
  }

 

  async presentToastMsgResp( message: string ) {
    
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  getNumInv(){
    if(this.concentrado.numInv!=''){
      this.taskService.getCapturaByNumInv(this.concentrado.numInv)
      .then(response => {
        this.datosActivos = response;
        if (this.datosActivos.length === 2){
          this.presentToastMsgResp('registro duplicado');
        } else {
          this.presentToastMsgResp('numero de veces registrado: ' + this.datosActivos.length  );
        }
        if(response.length===1){
          for (let index = 0; index < response.length; index++) {
            console.log("serie "+ JSON.stringify(response));
          
            this.concentrado.idDatofijo = response[0].id_dato_fijo;
            this.concentrado.noSap = response[0].num_sap;
            this.concentrado.descripcion = response[0].descripcion;
            this.concentrado.ubicacionInt = response[0].ubicacion_int;
            this.concentrado.ubicacionAnt = response[0].ubicacion_ant;
            this.concentrado.edoFisico = response[0].edo_fisico;
            this.concentrado.descCorta = response[0].desc_corta;
            this.concentrado.marca = response[0].marca;
            this.concentrado.modelo = response[0].modelo;
            this.concentrado.serie = response[0].serie;
            this.concentrado.color = response[0].color;
            this.concentrado.dimensiones = response[0].dimensiones;

           } 
         
        } 
      })
      .catch( error => {
      console.error( error );
      });
    } else {
      this.presentToastMsgResp('El campo NumInv esta vacio');
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

  updateSelectCargaMasiva(event) {
    this.estadoCheck = event.detail.checked;
   
  }

  updateSelectCamara(event) {
    this.estadoCheckC = event.detail.checked;
   
  }


  limpiarForm(){
    this.  concentrado = {
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
  }


}
