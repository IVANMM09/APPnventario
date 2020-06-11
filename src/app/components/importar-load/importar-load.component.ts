import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-importar-load',
  templateUrl: './importar-load.component.html',
  styleUrls: ['./importar-load.component.scss'],
})
export class ImportarLoadComponent implements OnInit {

  csvData: any[] = [];
  headerRow: any[] = [];
  returnpath = '';
  private win: any = window;
  // tslint:disable-next-line:max-line-length
  constructor(private socialSharing: SocialSharing, public toastController: ToastController, private filePath: FilePath, private fileChooser: FileChooser,  private papa: Papa, private plt: Platform, private file: File, private http: HttpClient ) { }

  ngOnInit() {
  }

  pickFile() {
    this.fileChooser.open().then((fileuri) => {
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


  private extractData(res) {
    // tslint:disable-next-line:prefer-const
    let csvData = res || '';
 
    this.papa.parse(csvData, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0]; 
        this.csvData = parsedData.data;
        console.log(parsedData.data)
      }
    });
  

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Archivo importado existosamente',
      duration: 1500
    });
    toast.present();
  }
 
  exportCSV() {
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
  }
}
