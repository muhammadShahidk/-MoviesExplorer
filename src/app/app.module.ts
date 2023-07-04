import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { MoveComponent } from './Components/move/move.component';
import { MoviesListComponent } from './Pages/movies-list/movies-list.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FiltersComponent } from './Components/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MoveComponent,
    MoviesListComponent,
    HeaderComponent,
    SidebarComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,       
    AppRoutingModule,
    FormsModule,
    LazyLoadImageModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
