import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Pages/error/error.component';
import { MoviesListComponent } from './Pages/movies-list/movies-list.component';

const routes: Routes = [
  {path:"",component:MoviesListComponent},
  {path:"error",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
