import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TasksService } from '../../services/tasks-service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-exportar-data',
  templateUrl: './exportar-data.component.html',
  styleUrls: ['./exportar-data.component.scss'],
})
export class ExportarDataComponent implements OnInit {

  porcentaje = 0;
  progressbar = 0;

  csvData: any[];
  headerRow: any[];
  
  returnpath = '';

  constructor( private plt: Platform,
               private papa: Papa,
               public tasksService: TasksService,
               private socialSharing: SocialSharing,
               private filePath: FilePath,
               private file: File,
               private fileSystem: File,
               public alertController: AlertController,) { }

  ngOnInit() {
    this.tasksService.getAllCapturaLayout().then(response => {
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Descarga de Archivo',
      message: 'Elija una Opción',
      buttons: [
        
        {
          text: 'Txt',
         
          handler: () => {
            this.progressbar = 1;
            const timeValue = setInterval((interval) => {
              this.porcentaje = this.porcentaje + 1;
              console.log(this.porcentaje);
              if (this.porcentaje >= 2) {
                clearInterval(timeValue);
                this.progressbar = 0;
                this.downloadTXT();
              }
              
            }, 1000);
            
          }
        }, {
          text: 'Csv',
          handler: () => {
            this.progressbar = 1;
            const timeValue = setInterval((interval) => {
              this.porcentaje = this.porcentaje + 1;
              console.log(this.porcentaje);
              if (this.porcentaje >= 2) {
                clearInterval(timeValue);
                this.progressbar = 0;
                this.downloadCSV();
              }
              
            }, 1000);
          
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          },
      ],
      backdropDismiss: false
    });

    await alert.present();
  }




  downloadCSV() {

    let path = this.fileSystem.externalRootDirectory + '/Download/'; // for Android
    let csv = this.papa.unparse({
      /*fields: this.headerRow,*/
      data: this.csvData
    });
 
    this.file.writeFile(path, 'rep_cap.csv', csv, { replace: true })
    .then(
    _ => {
      alert('Archivo descargado en /Download/rep_cap.csv');
    }
    )
    .catch(
    err => {

      this.file.writeExistingFile(path, 'rep_cap.csv', csv)
        .then(
        _ => {
          alert('Archivo sobreescrito en /Download/rep_cap.csv' + path);
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

downloadTXT() {

  let path = this.fileSystem.externalRootDirectory + '/Download/'; // for Android
  let csv = this.papa.unparse({
    /*fields: this.headerRow,*/
    data: this.csvData
  });

  this.file.writeFile(path, 'rep_cap.txt', csv, { replace: true })
  .then(
  _ => {
    alert('Archivo descargado en /Download/rep_cap.txt');
  }
  )
  .catch(
  err => {

    this.file.writeExistingFile(path, 'rep_cap.txt', csv)
      .then(
      _ => {
        alert('Archivo sobreescrito en /Download/rep_cap.txt' + path);
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