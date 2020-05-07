import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatoF } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  activos: DatoF[] = [];

  constructor(private storage: Storage) { 

    this.cargarActivos();
  }

  guardarActivo(activo: DatoF) {
    const existe = this.activos.find(acti => acti.codInmueble === activo.codInmueble );

    if (!existe) {

      this.activos.unshift( activo );
      this.storage.set('basedf', this.activos);
    }


}

async cargarActivos() {

  // tslint:disable-next-line:no-shadowed-variable
  const activos = await this.storage.get('basedf');

  if( activos ){
    this.activos = activos;
  }

}

}


