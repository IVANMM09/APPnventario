import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-importar-archivo',
  templateUrl: './importar-archivo.page.html',
  styleUrls: ['./importar-archivo.page.scss'],
})
export class ImportarArchivoPage implements OnInit {
returnpath = '';
  constructor( private filePath: FilePath, private fileChooser: FileChooser ) { }

  ngOnInit() {
  }

  pickFile() {
    this.fileChooser.open().then((fileuri) => {
      this.filePath.resolveNativePath(fileuri).then((resolvednativepath) => {
        this.returnpath = resolvednativepath;
      });
    });
    console.log('Importar Archivo');
  }

}
