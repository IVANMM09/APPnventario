import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TasksService } from '../../services/tasks-service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-exportar-data',
  templateUrl: './exportar-data.component.html',
  styleUrls: ['./exportar-data.component.scss'],
})
export class ExportarDataComponent implements OnInit {

  csvData: any[];
  headerRow: any[];
  
  returnpath = '';

  constructor( private plt: Platform,
               private papa: Papa,
               public tasksService: TasksService,
               private socialSharing: SocialSharing,
               private filePath: FilePath,
               private file: File,
               private fileSystem: File) { }

  ngOnInit() {
    this.tasksService.getAllCaptura().then(response => {
      this.csvData = response;
    })
    .catch( error => {
    console.error( error );
    });

   /* this.tasksService.getHeaderCaptura().then(response => {
      this.headerRow = response;
    })
    .catch( error => {
    console.error( error );
    });*/
  }


  downloadCSV() {

    let path = this.fileSystem.externalRootDirectory + '/Download/'; // for Android
    let csv = this.papa.unparse({
      /*fields: this.headerRow,*/
      data: this.csvData
    });
 
    this.file.writeFile(path, 'layout.csv', csv, { replace: true })
    .then(
    _ => {
      alert('Archivo descargado en /Download');
    }
    )
    .catch(
    err => {

      this.file.writeExistingFile(path, 'layout.csv', csv)
        .then(
        _ => {
          alert('Archivo sobreescrito en /Download' + path);
        }
        )
        .catch(
        err => {
          alert(err + 'Error en Descarga' + path)
        }
        )
    }
    )
}
}