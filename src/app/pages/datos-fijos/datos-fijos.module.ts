import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosFijosPageRoutingModule } from './datos-fijos-routing.module';

import { DatosFijosPage } from './datos-fijos.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosFijosPageRoutingModule,
    ComponentsModule

  ],
  declarations: [DatosFijosPage]
})
export class DatosFijosPageModule {}
