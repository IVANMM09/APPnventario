import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportarArchivoPageRoutingModule } from './exportar-archivo-routing.module';

import { ExportarArchivoPage } from './exportar-archivo.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportarArchivoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ExportarArchivoPage]
})
export class ExportarArchivoPageModule {}
