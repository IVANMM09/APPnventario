import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficaPageRoutingModule } from './grafica-routing.module';

import { GraficaPage } from './grafica.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GraficaPage]
})
export class GraficaPageModule {}
