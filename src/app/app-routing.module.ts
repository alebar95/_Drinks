import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
    {
      path: 'drinks/:id',
      loadChildren: () => import('./drink-detail/drink-detail.module').then( m => m.DrinkDetailPageModule)
    }
  ,
  {
    path: 'drinks',
    loadChildren: () => import('./drinks/drinks.module').then( m => m.DrinksPageModule)
  },
  {
    path: '',
    redirectTo: 'drinks',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
