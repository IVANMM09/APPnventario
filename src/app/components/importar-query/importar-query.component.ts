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

  porcentaje = 0;
  progressbar = 0;

  datosCaptura: DatoCaptura[] = [];
  textoBuscar = '';
  constructor(  public toastController: ToastController,
                public tasksService: TasksService,
                ) { 
                  const timeValue = setInterval((interval) => {
                    this.porcentaje = this.porcentaje + 1;
                    console.log(this.porcentaje);
                    if (this.porcentaje >= 2) {
                      clearInterval(timeValue);
                      this.progressbar = 1;
                    }
                    
                  }, 1000);
                }

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
