import { Injectable, wtfLeave } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatoF, Concentrado } from '../interfaces/interfaces';
import { Scan } from '../models/scan.model';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  activos: DatoF[] = [];
  concentrado: Observable<Concentrado[]>;
  concentra: Concentrado = {
    CODIGO_1: '',
    NUMERO_SERIE: '',
    MODELO: '',
    MARCA: '',
    DESCRIPCION: '',
    COLOR: '',
    ALTO: '',
    FONDO: '',
    FRENTE: '',
    CODIGO_2: '',
    UBICACION: '',
    DESCRIPCION_CORTA: ''
  };

  centro: any[];

  infoScan: Scan;

  constructor(private storage: Storage,
              private dataService: DataService) { 
    
    let scan = new Scan(this.concentra);  
    this.infoScan = scan;          

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

  muestraInfoScan(format: string, text: string){
    this.concentrado = this.dataService.getConcentrado();

    this.concentrado.forEach(cntro =>{
      this.centro = cntro;
      const finded = this.centro.find(ele => ele.CODIGO_2 == parseInt(text));
 
      if( finded !== null){
        const scan = new Scan(finded);
        this.infoScan = scan;
      }  
    })

    if(this.infoScan === null){
      this.concentra.CODIGO_2 = text;
      const scan = new Scan(this.concentra);
      this.infoScan = scan;
    }
    
  }

}


