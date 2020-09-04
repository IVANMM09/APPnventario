import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TasksService } from '../../services/tasks-service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { MsgService } from '../../services/msg.service';

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
               private fileSystem: File,
               public alertController: AlertController,
               public msgService: MsgService
               ) { }

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
            this.msgService.presentLoad('Descargando archivo...');
            this.downloadTXT();
            
          }
        }, {
          text: 'Csv',
          handler: () => {
            
            this.msgService.presentLoad('Descargando archivo...');
            this.downloadCSV();
            
          
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
      this.msgService.dismissLoad();
      alert('Archivo descargado en /Download/rep_cap.csv');
    }
    )
    .catch(
    err => {

      this.file.writeExistingFile(path, 'rep_cap.csv', csv)
        .then(
        _ => {
          this.msgService.dismissLoad();
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
    this.msgService.dismissLoad();
    alert('Archivo descargado en /Download/rep_cap.txt');
  }
  )
  .catch(
  err => {

    this.file.writeExistingFile(path, 'rep_cap.txt', csv)
      .then(
      _ => {
        this.msgService.dismissLoad();
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