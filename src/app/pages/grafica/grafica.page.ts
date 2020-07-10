import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})
export class GraficaPage implements OnInit {

vfaltante: 0;
vencontrado: 0;
vnuevo: 0;
estadosActivos: any [];

  constructor(public taskService: TasksService) { }

  ngOnInit() {
    // this.consultaEstado();
  }

  consultaEstado(){
         
    this.taskService.getEstatus('faltante')
    .then(response => {
      this.estadosActivos = response;
      
    })
    .catch( error => {
    console.error( error );
    });

  }

}
