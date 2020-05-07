import { Component, OnInit, ViewChild } from '@angular/core';

import { IonList, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';



@Component({
  selector: 'app-activos-data',
  templateUrl: './activos-data.component.html',
  styleUrls: ['./activos-data.component.scss'],
})
export class ActivosDataComponent implements OnInit {

  @ViewChild('lista', {static: true}) Lista: IonList;

 datosFijos: any[] = [];
 textoBuscar = '';
  constructor(public toastController: ToastController, public dataLocalService: DataLocalService) { 
    

  }
 
  ngOnInit() {
    this.datosFijos = this.dataLocalService.activos;
    // this.datosFijos = this.dataService.getDatosfijos();

    /*  this.dataService.getDatosfijos().subscribe((data: any) => {
      this.datosFijos = data.data;

    });*/

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

}
