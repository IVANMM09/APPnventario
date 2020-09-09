import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { TasksService } from 'src/app/services/tasks-service';
import { DatoF } from '../../interfaces/interfaces';
import { from } from 'rxjs';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-activos-form',
  templateUrl: './activos-form.component.html',
  styleUrls: ['./activos-form.component.scss'],
})
export class ActivosFormComponent implements OnInit {

  activos: DatoF[] = [];
  fechaActualDf: Date = new Date();

  activo = {
    idEmpleado: '',
    nombre: '',
    centroCostos: '',
    area: '',
    codInmueble: '',
    piso: '',
    usuario: '',
    fecha: String (this.fechaActualDf)
  };

  constructor(public toastController: ToastController,
              private taskService: TasksService,
              public msgService: MsgService) { }

  ngOnInit() {}

  /*async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos guardados existosamente',
      duration: 2500
    });
    toast.present();
  }*/


  async onSubmitDatosFijos(){
   /* const headers = {
      headers: new HttpHeaders ({
        'Content-Type': 'application/json'
      })
    };
    this.dataService.postDatosfijos(this.activo, headers); */
    // this.dataLocalService.guardarActivo(this.activo);

    this.taskService.create(this.activo).then(response => {
      this.msgService.presentMsgResp( response  );
      console.log(this.activo.nombre);
      this.limpiarForm();
    })
    .catch( error => 

      this.msgService.presentMsgError('surgio un error al guardar' + JSON.stringify(error) ));
    
    
  }

  limpiarForm(){
    this.activo = {
      idEmpleado: '',
      nombre: '',
      centroCostos: '',
      area: '',
      codInmueble: '',
      piso: '',
      usuario: '',
      fecha: String (this.fechaActualDf)
    };
  }
}
