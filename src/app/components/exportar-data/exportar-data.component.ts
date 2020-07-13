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
               private file: File) { }

  ngOnInit() {
    this.tasksService.getAllCaptura().then(response => {
      this.csvData = response;
    })
    .catch( error => {
    console.error( error );
    });

    this.tasksService.getHeaderCaptura().then(response => {
      this.headerRow = response;
    })
    .catch( error => {
    console.error( error );
    });
  }
  
  downloadFile(){
   
      let csv = this.papa.unparse({
        fields: this.headerRow,
        data: this.csvData
      });
   
      if (this.plt.is('cordova')) {
        this.file.writeFile(this.file.dataDirectory, 'data.csv', csv, {replace: true}).then( res => {
          this.socialSharing.share(null, null, res.nativeURL, null).then(e =>{
            // Success
          }).catch(e =>{
            console.log('Share failed:', e)
          });
        }, err => {
          console.log('Error: ', err);
        });
   
      } else {
        // Dummy implementation for Desktop download purpose
        // tslint:disable-next-line:prefer-const
        let blob = new Blob([csv]);
        // tslint:disable-next-line:prefer-const
        let a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'newdata.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    
  }
}
