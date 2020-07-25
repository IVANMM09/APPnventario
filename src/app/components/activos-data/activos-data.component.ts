import { Component, OnInit, ViewChild } from '@angular/core';

import { IonList, ToastController } from '@ionic/angular';
// import { DataLocalService } from '../../services/data-local.service';
import { TasksService } from '../../services/tasks-service';
import { DatoF } from '../../interfaces/interfaces';

@Component({
  selector: 'app-activos-data',
  templateUrl: './activos-data.component.html',
  styleUrls: ['./activos-data.component.scss'],
})
export class ActivosDataComponent implements OnInit {

  @ViewChild('lista', {static: true}) Lista: IonList;

  progress = 0;
 //datosFijos: any[] = [];
 datosFijos: DatoF[] = [];
 textoBuscar = '';
  constructor(
    public toastController: ToastController, 
   // public dataLocalService: DataLocalService,
    public tasksService: TasksService,
    
    ) { 



  }
 
  ngOnInit() {
    
    //this.datosFijos = this.dataLocalService.activos;
    this.datosFijos = this.tasksService.activos;
   // this.tasksService.create(this.datosFijos);
    // this.datosFijos = this.dataService.getDatosfijos();

    /*  this.dataService.getDatosfijos().subscribe((data: any) => {
      this.datosFijos = data.data;

    });*/
    
    this.getAllActivos();
   
  }

  progressBar(){
   for(let i = 0; i <= 10; i ++){
        for(let j = .01; j <= 100; j += .01){
            this.progress = i;
            console.log('j' + j);
        }
        console.log('i' + this.progress)
   }

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  borrar(dato){

    this.presentToast('Datos Borrados');
    console.log(dato);
    this.Lista.closeSlidingItems();

  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  getAllActivos(){
    
     this.tasksService.getAll()
    .then(datosFijos => {
      this.datosFijos = datosFijos;
      console.log("longitud" + this.datosFijos.length);
    })
    .catch( error => {
      console.error( error );
    });
  }
  
}
