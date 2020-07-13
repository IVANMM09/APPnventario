import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ActivosFormComponent } from './activos-form/activos-form.component';
import { FormsModule } from '@angular/forms';
import { ActivosDataComponent } from './activos-data/activos-data.component';
import { PipesModule } from '../pipes/pipes.module';
import { ActivosInfoComponent } from './activos-info/activos-info.component';
import { ImportarLoadComponent } from './importar-load/importar-load.component';
import { ImportarQueryComponent } from './importar-query/importar-query.component';
import { GraficaDataComponent } from './grafica-data/grafica-data.component';
import { ExportarDataComponent } from './exportar-data/exportar-data.component';
import { SQLite } from '@ionic-native/sqlite/ngx';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    ActivosFormComponent,
    ActivosDataComponent,
    ActivosInfoComponent,
    ImportarLoadComponent,
    ImportarQueryComponent,
    GraficaDataComponent,
    ExportarDataComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    PipesModule

  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    ActivosFormComponent,
    ActivosDataComponent,
    ActivosInfoComponent,
    ImportarLoadComponent,
    ImportarQueryComponent,
    GraficaDataComponent,
    ExportarDataComponent
  ], providers: [
    SQLite
  ]
})
export class ComponentsModule { }
