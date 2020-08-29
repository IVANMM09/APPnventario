import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Concentrado } from 'src/app/interfaces/interfaces';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { TasksService } from '../../services/tasks-service';
import { ToastController, NavController, IonInput } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Data } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-activos-info',
  templateUrl: './activos-info.component.html',
  styleUrls: ['./activos-info.component.scss'],
})
export class ActivosInfoComponent implements OnInit {

  @ViewChild('input', {static: false}) input: { setFocus: () => void; };
  

  conteocap = {
    encontrado: 0,
    nuevo: 0,
    total: 0
  };

  varDF = 'no hay dato fijo';
  contcapturas = 0;
  estadoCheck: boolean;
  estadoCheckC: boolean;
  edoButtonEdit: boolean;
  dFijoCheck = 1;
  dFormCheck: boolean;
  scanInfo: Concentrado[] = [];
  datosActivos: any [];
  datos :Data[];
  centroCostos:any [];
  data: any [];
  concentrado = {
    idCaptura :'',
    idDatofijo: '',
    noCapturas: '',
    empresa: '',
    numInv: '',
    noSap: '',
    descripcion: '',
    ubicacion: '',
    edoFisico: '',
    descCorta: '',
    marca: '',
    modelo: '',
    serie: '',
    color: '',
    largo: '',
    ancho: '',
    alto: '',
    estatus: '',
    centroCostos: ''
  };


  constructor(public barcodeScanner: BarcodeScanner,
              public dataLocal: DataLocalService,
              public taskService: TasksService,
              public toastController: ToastController,
              public alertController: AlertController, 
              private platform: Platform,
              private navCtrl: NavController
              ) {
                
              }

  ngOnInit() {
    console.log('datos combo '+ JSON.stringify(this.taskService.getIdDatoFijo()));
    this.platform.ready().then(()=>{
      this.taskService.getIdDatoFijo().
      then(datosFijos => {
        console.log('datos combo '+ JSON.stringify(datosFijos));
        this.datos = datosFijos;
    })
   })

    this.conteoCapturas();
    
    
  }
  setFocusOnInput() {
    this.input.setFocus();
 }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro Duplicado',
      message: 'Elija una Opción',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.limpiarForm();
          }
        }, {
          text: 'Editar',
          handler: () => {
          this.mostrarBotonEditar(true);
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
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
       
      this.getCC(this.concentrado);
      

    }
    this.conteoCapturas();
    this.presentToastMsgResp('Datos guardados');
    this.limpiarForm();
    this.setFocusOnInput();
    
  }

    getCC(concentrado){
      this.taskService.getCC(this.concentrado.idDatofijo)
      .then(response => {
        if(response!=null){
          this.centroCostos = response;
          concentrado.centroCostos = this.centroCostos[0].centro_costos;
          concentrado.estatus = 'nuevo';
          this.taskService.insertCaptura(concentrado);
          this.conteoCapturas();                         
        }else{
          console.log('No se encontro centro de costos ');
          concentrado.estatus = 'nuevo';
          this.taskService.insertCaptura(concentrado);
          this.conteoCapturas();
        }
      });
      
    }
 

    getCCUpdate(concentrado){
      this.taskService.getCC(this.concentrado.idDatofijo)
      .then(response => {
        if(response!=null){
          this.centroCostos = response;
          concentrado.centroCostos = this.centroCostos[0].centro_costos;                        
        }
      });
    }


  async presentToastMsgResp( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 2500
    });
    toast.present();
  }

  getNumInv(){
    if(this.concentrado.numInv.trim() !== '' && this.concentrado.numInv.trim() !== '0' ){
      this.taskService.getCapturaByNumInv(this.concentrado.numInv)
      .then(response => {
        this.datosActivos = response;
       /* if (this.datosActivos.length === 2){
          this.presentToastMsgResp('registro duplicado');
        } else {
          this.presentToastMsgResp('numero de veces registrado: ' + this.datosActivos.length  );
        } */
        if(response.length===1 ){
          this.concentrado.idCaptura = response[0].id_captura
         // this.concentrado.estatus = 'encontrado';
          this.taskService.updateStatus(this.concentrado);
          //this.presentToastMsgResp('registro duplicado');
          this.conteoCapturas();

          // tslint:disable-next-line:prefer-for-of
          for (let index = 0; index < response.length; index++) {
            console.log('serie ' + JSON.stringify(response));

            this.concentrado.idCaptura = response[0].id_captura;
            this.concentrado.idDatofijo = response[0].id_dato_fijo;
            this.concentrado.empresa = response[0].empresa;
            this.concentrado.noSap = response[0].num_sap;
            this.concentrado.descripcion = response[0].descripcion;
            this.concentrado.ubicacion = response[0].ubicacion;
            this.concentrado.edoFisico = response[0].edo_fisico;
            this.concentrado.descCorta = response[0].desc_corta;
            this.concentrado.marca = response[0].marca;
            this.concentrado.modelo = response[0].modelo;
            this.concentrado.serie = response[0].serie;
            this.concentrado.color = response[0].color;
            this.concentrado.largo = response[0].largo;
            this.concentrado.alto = response[0].alto;
            this.concentrado.ancho = response[0].ancho;
           } 
          this.presentAlertConfirm();

        } /*else {

         // this.presentToastMsgResp('El registro se guarda por ser nuevo o estar mas de dos veces ');
        }*/
      })
      .catch( error => {
      console.error( error );
      });
    } /*else {
      //this.presentToastMsgResp('se guarda por ser 0 o vacio ');
    }*/

 }


  scanCel(){
    this.barcodeScanner.scan().then(barcodeData => {

      this.presentToastMsgResp(barcodeData.text);

      if( !barcodeData.cancelled){
        this.presentToastMsgResp(barcodeData.text);
        this.presentToastMsgResp('Entro a funcion');
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

  mostrarBotonEditar(estado) {
    this.edoButtonEdit = estado;
   
  }


  limpiarForm(){
    this.  concentrado = {
      idCaptura :'',
      idDatofijo: this.concentrado.idDatofijo,
      noCapturas: '',
      empresa: this.concentrado.empresa,
      numInv: '',
      noSap: '',
      descripcion: '',
      ubicacion: this.concentrado.ubicacion,
      edoFisico: '',
      descCorta: '',
      marca: '',
      modelo: '',
      serie: '',
      color: '',
      largo: '',
      ancho: '',
      alto: '',
      estatus:'',
      centroCostos: ''
    };
    this.ngOnInit();
  }
  

  guardarEdicion(){
    this.mostrarBotonEditar(false);
    console.log("update " + JSON.stringify(this.concentrado));  
    this.getCCUpdate(this.concentrado);  
    console.log("centro costos update " + this.concentrado)
    this.concentrado.estatus = 'encontrado';
    this.taskService.updateCaptura(this.concentrado);

    this.presentToastMsgResp('Registro Actualizado');
    this.limpiarForm();
  }

mostrarForm(){
  
  if(this.concentrado.idDatofijo !== undefined){
    this.varDF = this.concentrado.idDatofijo;
    this.dFormCheck = true;
    this.dFijoCheck = 2;
  } else {
    this.presentToastMsgResp('No hay datos fijos cargados');
  }
}

BuscarSAP(){
  if(this.concentrado.noSap.trim() !== '' && this.concentrado.noSap.trim() !== '0' ){
  this.taskService.getCapturaByNumSap(this.concentrado.noSap)
  .then(response => {
    this.datosActivos = response;
    if(response.length===1 ){
      this.concentrado.idCaptura = response[0].id_captura
      //this.concentrado.estatus = 'encontrado';
      this.taskService.updateStatus(this.concentrado);
      //this.presentToastMsgResp('registro duplicado');
      this.conteoCapturas();

      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < response.length; index++) {
        console.log('serie ' + JSON.stringify(response));

        this.concentrado.idCaptura = response[0].id_captura;
        this.concentrado.idDatofijo = response[0].id_dato_fijo;
        this.concentrado.empresa = response[0].empresa;
        this.concentrado.noSap = response[0].num_sap;
        this.concentrado.descripcion = response[0].descripcion;
        this.concentrado.ubicacion = response[0].ubicacion;
        this.concentrado.edoFisico = response[0].edo_fisico;
        this.concentrado.descCorta = response[0].desc_corta;
        this.concentrado.marca = response[0].marca;
        this.concentrado.modelo = response[0].modelo;
        this.concentrado.serie = response[0].serie;
        this.concentrado.color = response[0].color;
        this.concentrado.largo = response[0].largo;
        this.concentrado.alto = response[0].alto;
        this.concentrado.ancho = response[0].ancho;
       } 
      this.presentAlertConfirm();

    }/* else {

      this.presentToastMsgResp('El registro se guarda por ser nuevo o estar mas de dos veces ');
    }*/
  })
  .catch( error => {
  console.error( error );
  });
}/* else {
  this.presentToastMsgResp('se guarda por ser 0 o vacio ');
}*/
}

BuscarSerie(){
  if(this.concentrado.serie.trim() !== '' && this.concentrado.serie.trim() !== '0' ){
    this.taskService.getCapturaBySerie(this.concentrado.serie)
    .then(response => {
      this.datosActivos = response;
      if(response.length===1 ){
        this.concentrado.idCaptura = response[0].id_captura
        //this.concentrado.estatus = 'encontrado';
        this.taskService.updateStatus(this.concentrado);
        //this.presentToastMsgResp('registro duplicado');
        this.conteoCapturas();
  
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < response.length; index++) {
          console.log('serie ' + JSON.stringify(response));
  
          this.concentrado.idCaptura = response[0].id_captura;
          this.concentrado.idDatofijo = response[0].id_dato_fijo;
          this.concentrado.empresa = response[0].empresa;
          this.concentrado.noSap = response[0].num_sap;
          this.concentrado.descripcion = response[0].descripcion;
          this.concentrado.ubicacion = response[0].ubicacion;
          this.concentrado.edoFisico = response[0].edo_fisico;
          this.concentrado.descCorta = response[0].desc_corta;
          this.concentrado.marca = response[0].marca;
          this.concentrado.modelo = response[0].modelo;
          this.concentrado.serie = response[0].serie;
          this.concentrado.color = response[0].color;
          this.concentrado.largo = response[0].largo;
          this.concentrado.alto = response[0].alto;
          this.concentrado.ancho = response[0].ancho;
         } 
        this.presentAlertConfirm();
  
      } /*else {
  
        this.presentToastMsgResp('El registro se guarda por ser nuevo o estar mas de dos veces ');
      }*/
    })
    .catch( error => {
    console.error( error );
    });
  }/* else {
    this.presentToastMsgResp('se guarda por ser 0 o vacio ');
  }*/
}

conteoCapturas(){

  this.taskService.getStatus()
  .then(response => {
    for (let index = 0; index < response.length; index++) {
      if(response[index].estatus === 'encontrado'){
        this.conteocap.encontrado = response[index].cantidad;
      } else if(response[index].estatus === 'nuevo'){
        this.conteocap.nuevo = response[index].cantidad;
      }
    }
    this.conteocap.total = this.conteocap.encontrado + this.conteocap.nuevo;


  })
}

}
