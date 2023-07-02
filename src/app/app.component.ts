import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MoviesDbService } from './Services/movies-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MovesExplorer';
  MoviesCatagories!:[];
  constructor(private Db: MoviesDbService) { }

}
