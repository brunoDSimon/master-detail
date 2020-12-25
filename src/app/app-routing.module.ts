import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    loadChildren: () => import('./features/categories/categories.module').then(m => m.CategoriesModule),
  },
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'category',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
