import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Componente, Concentrado } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  getMenuOpts() {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getConcentrado(){
    return this.http.get<Concentrado[]>('/assets/data/concentrado.json');
  }


}
