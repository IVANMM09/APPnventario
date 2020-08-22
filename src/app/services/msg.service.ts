import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class MsgService {
  isLoading = false;
  constructor(public loadingController: LoadingController) { }

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

}
