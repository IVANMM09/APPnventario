import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportarArchivoPageRoutingModule } from './importar-archivo-routing.module';

import { ImportarArchivoPage } from './importar-archivo.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportarArchivoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ImportarArchivoPage]
})
export class ImportarArchivoPageModule {}
