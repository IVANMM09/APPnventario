import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks-service';

@Component({
  selector: 'app-grafica-data',
  templateUrl: './grafica-data.component.html',
  styleUrls: ['./grafica-data.component.scss'],
})
export class GraficaDataComponent implements OnInit {

  conteo = {
    faltante : 0,
    encontrado: 1,
    nuevo: 2
  };

  constructor(public taskService: TasksService) { }

  ngOnInit() {}

}
