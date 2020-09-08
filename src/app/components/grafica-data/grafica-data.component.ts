import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks-service';
import { Conteo } from '../../interfaces/interfaces';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-grafica-data',
  templateUrl: './grafica-data.component.html',
  styleUrls: ['./grafica-data.component.scss'],
})
export class GraficaDataComponent implements OnInit {

  conteo = {
    faltante : 0,
    encontrado: 0,
    nuevo: 0,
    total: 0
  };

  
  //conteo: Conteo[] = [];

  constructor(public taskService: TasksService, public msgService: MsgService) { }

  ngOnInit() {
    this.getDatosGrafica();
  }

getDatosGrafica(){
  console.log("Entro a Grafica ");
    this.taskService.getStatus()
    .then(response => {
      console.log("resultado " + JSON.stringify(response));
      
      for (let index = 0; index < response.length; index++) {
        if(response[index].estatus === 'encontrado'){
          this.conteo.encontrado = response[index].cantidad;
        } else if(response[index].estatus === 'nuevo'){
          this.conteo.nuevo = response[index].cantidad;
        }else if(response[index].estatus === 'faltante'){
          this.conteo.faltante = response[index].cantidad;
        }
      }
      this.conteo.total = this.conteo.encontrado + this.conteo.faltante + this.conteo.nuevo;


    }).catch( error => 

      this.msgService.presentMsgError('surgio un error al consultar captura' + error ));
}

}
