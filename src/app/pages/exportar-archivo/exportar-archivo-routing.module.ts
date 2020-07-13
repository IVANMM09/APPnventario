import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportarArchivoPage } from './exportar-archivo.page';

const routes: Routes = [
  {
    path: '',
    component: ExportarArchivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportarArchivoPageRoutingModule {}
