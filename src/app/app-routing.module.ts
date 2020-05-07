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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
