import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
import { TasksService } from '../../services/tasks-service';
import { DatoCaptura } from '../../interfaces/interfaces';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-importar-query',
  templateUrl: './importar-query.component.html',
  styleUrls: ['./importar-query.component.scss'],
})
export class ImportarQueryComponent implements OnInit {

  @ViewChild('lista', {static: true}) Lista: IonList;

 radioSelect = '';

  datosCaptura: DatoCaptura[] = [];
  textoBuscar = '';
  datosActivos: any [];
  concentrado = {
    numInvb: '',
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

  constructor(  public toastController: ToastController,
                public tasksService: TasksService,
                public msgService: MsgService
                ) { 

                }

  ngOnInit() {

  }

 RadioChangeEvent(event){
this.radioSelect = event.detail.value;
console.log(this.radioSelect);
 }

  busquedaRadio(){
    if (this.radioSelect == '1'){
      console.log("busqueda por uno");
    this.msgService.presentLoad('Buscando registro...');
    if(this.textoBuscar.trim() !== '' && this.textoBuscar.trim() !== '0' ){
      console.log('NUMINV' + this.textoBuscar);
      this.tasksService.getCapturaByNumInv(this.textoBuscar)
      .then(response => {
        this.datosActivos = response;
        if(this.datosActivos.length >= 1 ){

          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('registro encontrado');

        } else
        {
          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('registro NO encontrado');
          this.limpiarForm();
        }
      }).catch( error => 

        this.msgService.presentMsgError('surgio un error durante la busqueda' + error ));
    } else {
      this.msgService.dismissLoad();
      this.msgService.presentMsgResp('registro en blanco o 0');
      this.limpiarForm();

    }
  } else if (this.radioSelect == '2'){
    console.log("busqueda por dos");
    this.msgService.presentLoad('Buscando registro...');
    if(this.textoBuscar.trim() !== '' && this.textoBuscar.trim() !== '0' ){
      console.log('SAP' + this.textoBuscar);
      this.tasksService.getCapturaByNumSap(this.textoBuscar)
      .then(response => {
        this.datosActivos = response;
        if(this.datosActivos.length >= 1 ){

          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('Registro encontrado');

        } else
        {
          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('Registro NO encontrado');
          this.limpiarForm();
        }
      })
      .catch( error => 

        this.msgService.presentMsgError('surgio un error durante la busqueda' + error ));
    } else {
      this.msgService.dismissLoad();
      this.msgService.presentMsgResp('Registro en blanco o 0');
      this.limpiarForm();

    }
  } else if (this.radioSelect == '3'){
    console.log("busqueda por tres");
    
    this.msgService.presentLoad('Buscando registro...');
    if(this.textoBuscar.trim() !== '' && this.textoBuscar.trim() !== '0' ){
      console.log('Serie' + this.textoBuscar);
      this.tasksService.getCapturaBySerie(this.textoBuscar)
      .then(response => {
        this.datosActivos = response;
        if(this.datosActivos.length >= 1 ){

          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('Registro encontrado');

        } else
        {
          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('Registro NO encontrado');
          this.limpiarForm();
        }
      })
      .catch( error => 

        this.msgService.presentMsgError('surgio un error durante la busqueda' + error ));
    } else {
      this.msgService.dismissLoad();
      this.msgService.presentMsgResp('Registro en blanco o 0');
      this.limpiarForm();

    }
  }else{
  
    this.msgService.presentMsgResp('Busqueda no valida, elija una opción');
  }
 }

 /*async presentToastMsgResp( message: string ) {
  const toast = await this.toastController.create({
    message,
    duration: 2500
  });
  toast.present();
}*/

limpiarForm(){
  this.concentrado = {
    numInvb: '',
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
    estatus:'',
    centroCostos: ''
  };
  this.ngOnInit();
}
}
