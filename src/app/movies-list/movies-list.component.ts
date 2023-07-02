import { Component } from '@angular/core';
import { MoviesDbService } from '../Services/movies-db.service';
import { MoveTitleDetails, MoviesTitlesPage } from '../Models/IModels';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {
  constructor(private Moves:MoviesDbService) { }
  // Page!:;
  MoviesTitles!:MoveTitleDetails[];

  ngOnInit(): void {
    // this.Moves.getMoviesTitles({genre:'Action',page:'1',year:2022,list:'most_pop_movies',limit:10}).subscribe( {
    //   next: (v:MoviesTitlesPage) => this.MoviesTitles = v.results.filter((x)=>x.primaryImage != null),
    //   error: (e) => console.error(e),
    //   complete: () => console.log(this.MoviesTitles)
    //   // console.log(this.MoviesTitles.Results.map((x)=>x.titleText.text));
    // });

    this.Moves.getLocalMoviesTitles().subscribe( r=>this.MoviesTitles = r.results.filter((x)=>x.primaryImage != null));
  }

}
