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


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    ActivosFormComponent,
    ActivosDataComponent
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
    ActivosDataComponent
  ]
})
export class ComponentsModule { }
