import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class MsgService {
  isLoading = false;
  constructor(public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController) { }

  async presentLoad(message: string) {
    this.isLoading = true;
    return await this.loadingController.create({
      message
    }

    ).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoad() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return null;
  }

  async presentMsgResp( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 2500
    });
    toast.present();
  }

  async presentMsgError(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',

        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

}
