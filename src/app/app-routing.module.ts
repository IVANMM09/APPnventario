import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'datos-fijos',
    loadChildren: () => import('./pages/datos-fijos/datos-fijos.module').then( m => m.DatosFijosPageModule)
  },
  {
    path: 'importar-archivo',
    loadChildren: () => import('./pages/importar-archivo/importar-archivo.module').then( m => m.ImportarArchivoPageModule)
  },
  {
    path: 'captura',
    loadChildren: () => import('./pages/captura/captura.module').then( m => m.CapturaPageModule)
  },
  {
    path: 'grafica',
    loadChildren: () => import('./pages/grafica/grafica.module').then( m => m.GraficaPageModule)
  },
  {
    path: 'exportar-archivo',
    loadChildren: () => import('./pages/exportar-archivo/exportar-archivo.module').then( m => m.ExportarArchivoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
