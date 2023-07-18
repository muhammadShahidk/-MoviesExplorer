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
  selectedCatagory!:string;

  constructor(private Db: MoviesDbService) { }

  getData(){
    // this.MoviesCatagories
    this.Db.getMoviesCatagories().subscribe({
      next: (v) => this.MoviesCatagories = v.results,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    this.Db.getMoviesCatagories().subscribe()
  }


  sideBarResponse(event: string) {
    console.log(event);
    
    this.selectedCatagory = event;
    return 'false';
  }
}
