import { Component, OnInit, OnDestroy  } from '@angular/core';
import {Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.page.html',
  styleUrls: ['./salida.page.scss'],
})
export class SalidaPage implements OnInit {

  constructor(public alertController: AlertController) { 
    
  }

  ngOnInit() {
    

  }

  ionViewWillEnter(){
    this.presentAlertSalir();
  }

  // tslint:disable-next-line:use-lifecycle-interface

async presentAlertSalir() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Salir',
    message: '¿Esta seguro que desea salir?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',

      }, {
        text: 'Salir',
        handler: () => {
        this.SalirApp();
        }
      }
    ],
    backdropDismiss: false
  });

  await alert.present();
}

SalirApp(){}


}
