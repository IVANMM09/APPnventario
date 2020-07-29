import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { TasksService } from './services/tasks-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  fechaActualDf: Date = new Date();

  componentes: Observable<Componente[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private taskService: TasksService,
    public sqlite: SQLite
  ) {
    this.initializeApp();
        
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.createDatabase();
      this.componentes = this.dataService.getMenuOpts();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log(db);
      this.taskService.setDatabase(db);
      this.taskService.createTableCaptura();
      return this.taskService.createTable();
    })
    .catch(error =>{
      console.error(error);
    });
  }

}
