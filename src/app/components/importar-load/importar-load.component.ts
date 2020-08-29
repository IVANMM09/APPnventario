import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TasksService } from '../../services/tasks-service';
import { stringify } from '@angular/compiler/src/util';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { MsgService } from '../../services/msg.service';


@Component({
  selector: 'app-importar-load',
  templateUrl: './importar-load.component.html',
  styleUrls: ['./importar-load.component.scss'],
})
export class ImportarLoadComponent implements OnInit {

  porcentaje = 0;
  progressbar = 0;

fechaActualDf: Date = new Date();

activo = {
  idEmpleado: 'generico',
  nombre: 'generico',
  centroCostos: 'generico',
  piso: 'generico',
  usuario: 'generico',
  fecha: String(this.fechaActualDf)
}
  
  csvData: any[] = [];
  headerRow: any[] = [];
  datos: any[] = [];
  returnpath = '';
  private win: any = window;
  // tslint:disable-next-line:max-line-length
  constructor(private socialSharing: SocialSharing, 
              public toastController: ToastController, 
              private filePath: FilePath, private fileChooser: FileChooser,  
              private papa: Papa, private plt: Platform, private file: File, 
              private http: HttpClient,
              public tasksService: TasksService,
              public sqlite: SQLite,
              public msgService: MsgService
              
    ) { 

    }

  ngOnInit() {
     this.tasksService.getAllCaptura();
     console.log(JSON.stringify(this.tasksService.getAllCaptura()));
  }

  


  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.tasksService.setDatabase(db);
    })
    .catch(error =>{
      console.error(error);
    });
    }

  pickFile() {
    
    this.fileChooser.open().then((fileuri) => {
      this.msgService.presentLoad('Cargando archivo...');
      this.tasksService.deleteTableCaptura();
      this.tasksService.selectChange();
      this.tasksService.deleteTableDatosFijos();
      this.tasksService.selectChange();
      this.tasksService.InitializeSeqCaptura();
      this.tasksService.selectChange();
      this.tasksService.InitializeSeqDatosFijos();
      this.tasksService.selectChange();
      this.tasksService.create(this.activo);
      this.tasksService.selectChange();
      this.filePath.resolveNativePath(fileuri).then((resolvednativepath) => {
        this.returnpath = resolvednativepath;
        this.http
      .get(this.win.Ionic.WebView.convertFileSrc(this.returnpath), {
        responseType: 'text'

      })
      .subscribe(
        data => this.extractData(data),
        err => console.log('something went wrong: ', err)
      );

      });
    });

    

  }

  private saveData(data: any){
      
    
      for (let index = 0; index <data.length; index++) {
        //let id_data = this.tasksService.getCC(data.CC);   
        if(data[index]!='' && data[index]!=null ){
          data[index][14] = 'faltante'; 
          data[index][15] = 1; 
          data[index][16] = this.fechaActualDf;
          this.tasksService.insertCapturaLayout(data[index]).
          catch(error=>this.presentToast("Error al Carga el archivo, favor de validar: " + error));
          this.tasksService.selectChange();
         // console.log("Entro Save Data " +JSON.stringify(data[index]));
        }   
       
    }
  }
  private saveData2(data: any){
      
    let cont = 0;
    for (let index = 0; index <= data.length; index++) {
    
      //let id_data = this.tasksService.getCC(data.CC);   
      if(data[index]!='' && data[index]!=null ){
        data[index][14] = 'faltante'; 
        data[index][15] = 1; 
        data[index][16] = this.fechaActualDf;
        this.tasksService.insertCapturaLayout2(data[index]).then(response => {
          //console.log('este es el response ' +  response);
          cont ++;
          //console.log('cont ' +  cont);
          //console.log('length' +  data.length);
          //console.log('length -1 ' +  (data.length - 1));
          if(cont === (data.length - 1)) 
          {
            this.msgService.dismissLoad();
            this.presentToast('Carga completa, archivos cargados ' + this.csvData.length.toString());
          }
          
        });
        //this.presentToast("Error al Carga el archivo, favor de validar: " + error);
        //this.tasksService.selectChange();
       // console.log("Entro Save Data " +JSON.stringify(data[index]));
      }   
     
  }
}
  


  private extractData(res) {
    // tslint:disable-next-line:prefer-const

    let csvData = res || '';
 
    this.papa.parse(csvData, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0]; 
        this.csvData = parsedData.data;
      
        console.log("extract data " + parsedData.data);
        this.saveData2(parsedData.data);
        
      }
      
      
    });
    
  
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500
    });
    toast.present();
  }
 
  /* exportCSV() {
    this.tasksService.getAllCaptura()
    .then(response => {
      this.csvData = response;
    });

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

 
  trackByFn(index: any, item: any) {
    return index;
  } */
}
