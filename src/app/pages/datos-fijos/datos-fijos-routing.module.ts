import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosFijosPage } from './datos-fijos.page';

const routes: Routes = [
  {
    path: '',
    component: DatosFijosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosFijosPageRoutingModule {}
