import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportarArchivoPage } from './importar-archivo.page';

const routes: Routes = [
  {
    path: '',
    component: ImportarArchivoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportarArchivoPageRoutingModule {}
