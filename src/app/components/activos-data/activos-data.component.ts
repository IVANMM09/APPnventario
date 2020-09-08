import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
// import { DataLocalService } from '../../services/data-local.service';
import { TasksService } from '../../services/tasks-service';
import { DatoF } from '../../interfaces/interfaces';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-activos-data',
  templateUrl: './activos-data.component.html',
  styleUrls: ['./activos-data.component.scss'],
})
export class ActivosDataComponent implements OnInit {

  @ViewChild('lista', {static: true}) Lista: IonList;


 
 //datosFijos: DatoF[] = [];
 
 datosFijos: any [];
 msgerror: any [];
 textoBuscar = '';
 concentradoDF = {
  idDatoFijos: '',
  idEmploye :'',
  centroCostos: '',
  codInmueble: '',
  piso: '',
  usuario: '',
  fecha: ''
};


  constructor(
    public toastController: ToastController, 
   // public dataLocalService: DataLocalService,
    public tasksService: TasksService,
    public msgService: MsgService
    
    ) { 

  }

  ngOnInit() {




  }

  getIdEmpleado(){
    this.msgService.presentLoad('buscando registro...');
    if(this.textoBuscar.trim() !== '' && this.textoBuscar.trim() !== '0' ){
      console.log('name' + this.textoBuscar);
      this.tasksService.getIdEmploye(this.textoBuscar)
      .then(response => {
        this.datosFijos = response;
        if(this.datosFijos.length >= 1 ){

          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('registro encontrado');

        } else
        {
          this.msgService.dismissLoad();
          this.msgService.presentMsgResp('registro NO encontrado');
          this.limpiarForm();
        }
      })
      .catch( error => 

        this.msgService.presentMsgError('surgio un error durante la busqueda' + error ));
    } else {
      this.msgService.dismissLoad();
      this.msgService.presentMsgResp('registro en blanco o 0');
      this.limpiarForm();

    }
  }

 /* async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500
    });
    toast.present();
  }*/
  limpiarForm(){
    this.concentradoDF = {
      idDatoFijos: '',
      idEmploye :'',
      centroCostos: '',
      codInmueble: '',
      piso: '',
      usuario: '',
      fecha: ''
    };
    this.ngOnInit();
  }



}
