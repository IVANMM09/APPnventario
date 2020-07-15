import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
import { TasksService } from '../../services/tasks-service';
import { DatoCaptura } from '../../interfaces/interfaces';

@Component({
  selector: 'app-importar-query',
  templateUrl: './importar-query.component.html',
  styleUrls: ['./importar-query.component.scss'],
})
export class ImportarQueryComponent implements OnInit {

  @ViewChild('lista', {static: true}) Lista: IonList;
  datosCaptura: DatoCaptura[] = [];
  textoBuscar = '';
  constructor(  public toastController: ToastController,
                public tasksService: TasksService,
                ) { }

  ngOnInit() {
    this.getCaptura();
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
  getCaptura(){
    this.tasksService.getAllCaptura()
    .then(resp => {
      this.datosCaptura = resp;
      console.log("longitud" + this.datosCaptura.length);
    })
    .catch( error => {
      console.error( error );
    });
  }
}
